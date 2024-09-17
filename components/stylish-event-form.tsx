"use client"

import React, { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { useDropzone } from "react-dropzone"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon, ImageIcon, DollarSignIcon, MapPinIcon, VideoIcon, UsersIcon, GlobeIcon } from "lucide-react"
import axios from "axios"

export function MultiStepForm() {
  const { register, handleSubmit, control, watch, setValue } = useForm({
    defaultValues: {
      name: "",
      description: "",
      capacity: "",
      UTCOFFset: "",
      startDate: "",
      endDate: "",
      isPaid: false,
      ticketPrice: "",
      isVirtual: false,
      zoomAddress: "",
      location: "",
      requireApproval: false,
      publicStatus: "",
      image: null,
    }
  })
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(1)

  const isPaid = watch('isPaid')
  const isVirtual = watch("isVirtual")

  const { getRootProps, getInputProps } = useDropzone({
    accept: {"image/*": []},
    onDrop: (acceptedFiles) => {
      setValue("image", acceptedFiles[0])
      setPreviewImage(URL.createObjectURL(acceptedFiles[0]))
    },
  })

  const onSubmit = (data: any) => {
    axios.post("/api/events", data)
  }

  const renderStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="col-span-1 md:col-span-2">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">Event Details</h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Event Name</Label>
                      <Input id="name" {...register("name", { required: true })} placeholder="Enter event name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        {...register("description", { required: true })}
                        placeholder="Describe your event"
                        rows={4}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Event Image</h2>
                  <div
                    {...getRootProps()}
                    className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:border-neutral-900 transition-colors dark:hover:border-neutral-50"
                  >
                    <input {...getInputProps()} />
                    {previewImage ? (
                      <img src={previewImage} alt="Preview" className="mx-auto max-h-48 object-cover rounded-md" />
                    ) : (
                      <div className="text-gray-500">
                        <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                        <p>Drag 'n' drop an image here, or click to select one</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Event Capacity</h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="capacity">Maximum Attendees</Label>
                      <div className="relative">
                        <UsersIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                          id="capacity"
                          type="number"
                          {...register("capacity", { required: true, min: 1 })}
                          placeholder="Enter max capacity"
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )
      case 2:
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Date and Time</h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date & Time</Label>
                      <div className="relative">
                        <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                        <Input
                          id="startDate"
                          type="datetime-local"
                          {...register("startDate", { required: true })}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date & Time</Label>
                      <div className="relative">
                        <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                        <Input
                          id="endDate"
                          type="datetime-local"
                          {...register("endDate", { required: true })}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Time Zone</h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="utcOffset">UTC Offset</Label>
                      <div className="relative">
                        <GlobeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                          id="utcOffset"
                          type="number"
                          {...register("UTCOFFset", { required: true })}
                          placeholder="Enter UTC offset"
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )
      case 3:
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Event Type</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="isPaid">Paid Event</Label>
                      <Controller
                        name="isPaid"
                        control={control}
                        render={({ field }) => (
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                    </div>
                    {isPaid && (
                      <div className="space-y-2">
                        <Label htmlFor="ticketPrice">Ticket Price</Label>
                        <div className="relative">
                          <DollarSignIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input
                            id="ticketPrice"
                            type="number"
                            step="0.01"
                            {...register("ticketPrice", { required: isPaid })}
                            placeholder="Enter ticket price"
                            className="pl-10"
                          />
                        </div>
                      </div>
                    )}
                    <Separator />
                    <div className="flex items-center justify-between">
                      <Label htmlFor="isVirtual">Virtual Event</Label>
                      <Controller
                        name="isVirtual"
                        control={control}
                        render={({ field }) => (
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                    </div>
                    {isVirtual ? (
                      <div className="space-y-2">
                        <Label htmlFor="zoomAddress">Zoom Address</Label>
                        <div className="relative">
                          <VideoIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input
                            id="zoomAddress"
                            {...register("zoomAddress", { required: isVirtual })}
                            placeholder="Enter Zoom meeting link"
                            className="pl-10"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <div className="relative">
                          <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input
                            id="location"
                            {...register("location", { required: !isVirtual })}
                            placeholder="Enter event location"
                            className="pl-10"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Event Settings</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="requireApproval">Require Approval</Label>
                      <Controller
                        name="requireApproval"
                        control={control}
                        render={({ field }) => (
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <Label htmlFor="publicStatus">Public Status</Label>
                      <Controller
                        name="publicStatus"
                        control={control}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select public status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="public">Public</SelectItem>
                              <SelectItem value="private">Private</SelectItem>
                              <SelectItem value="unlisted">Unlisted</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )
      default:
        return null
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-fuchsia-400">Create New Event</h1>
        <div className="flex space-x-2">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`w-3 h-3 rounded-full ${
                currentStep >= step ? "'bg-primary'" : "'bg-gray-300'"
              }`}
            />
          ))}
        </div>
      </div>

      {renderStep(currentStep)}

      <div className="flex justify-between mt-8">
        {currentStep > 1 && (
          <Button type="button" onClick={() => setCurrentStep(currentStep - 1)}>
            Previous
          </Button>
        )}
        {currentStep < 3 ? (
          <Button type="button" onClick={() => setCurrentStep(currentStep + 1)} className="ml-auto">
            Next
          </Button>
        ) : (
          <Button type="submit" className="ml-auto bg-zinc-800 hover:bg-zinc-700" variant={'outline'}>
            Create Event
          </Button>
        )}
      </div>
    </form>
  )
}