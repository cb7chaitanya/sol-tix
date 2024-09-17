"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import DatePicker from "react-datepicker"
import { useDropzone } from "react-dropzone"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Switch } from "./ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { CalendarIcon, ImageIcon } from "lucide-react"
import 'react-datepicker/dist/react-datepicker.css'

export function EventCreationForm() {
  const { register, handleSubmit, control, watch, setValue } = useForm()
  const [previewImage, setPreviewImage] = useState('')

  const isPaid = watch("'isPaid'")
  const isVirtual = watch("'isVirtual'")

  // const { getRootProps, getInputProps } = useDropzone({
  //   onDrop: (acceptedFiles) => {
  //     setPreviewImage(URL.createObjectURL(acceptedFiles[0]))
  //   },
  // })

  const onSubmit = (data: any) => {
    console.log(data)
    // Here you would typically send the data to your backend
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-6 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Create New Event</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Event Name</Label>
            <Input id="name" {...register("'name'", { required: true })} placeholder="Enter event name" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("'description'", { required: true })}
              placeholder="Describe your event"
              rows={4}
            />
          </div>

          {/* <div className="space-y-2">
            <Label>Event Image</Label>
            <div
              {...getRootProps()}
              className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer"
            >
              <input {...getInputProps()} />
              {previewImage ? (
                <img src={previewImage} alt="Preview" className="mx-auto max-h-48 object-cover" />
              ) : (
                <div className="text-gray-500">
                  <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <p>Drag 'n' drop an image here, or click to select one</p>
                </div>
              )}
            </div>
          </div> */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                id="capacity"
                type="number"
                {...register("'capacity'", { required: true, min: 1 })}
                placeholder="Enter max capacity"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="utcOffset">UTC Offset</Label>
              <Input
                id="utcOffset"
                type="number"
                {...register("'UTCOFFset'", { required: true })}
                placeholder="Enter UTC offset"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Start Date & Time</Label>
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="w-full p-2 border border-neutral-200 rounded dark:border-neutral-800"
                  />
                )}
              />
            </div>

            <div className="space-y-2">
              <Label>End Date & Time</Label>
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="w-full p-2 border border-neutral-200 rounded dark:border-neutral-800"
                  />
                )}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="isPaid" {...register("'isPaid'")} />
            <Label htmlFor="isPaid">Paid Event</Label>
          </div>

          {isPaid && (
            <div className="space-y-2">
              <Label htmlFor="ticketPrice">Ticket Price</Label>
              <Input
                id="ticketPrice"
                type="number"
                step="0.01"
                {...register("'ticketPrice'", { required: isPaid })}
                placeholder="Enter ticket price"
              />
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Switch id="isVirtual" {...register("'isVirtual'")} />
            <Label htmlFor="isVirtual">Virtual Event</Label>
          </div>

          {isVirtual ? (
            <div className="space-y-2">
              <Label htmlFor="zoomAddress">Zoom Address</Label>
              <Input
                id="zoomAddress"
                {...register("'zoomAddress'", { required: isVirtual })}
                placeholder="Enter Zoom meeting link"
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                {...register("'location'", { required: !isVirtual })}
                placeholder="Enter event location"
              />
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Switch id="requireApproval" {...register("'requireApproval'")} />
            <Label htmlFor="requireApproval">Require Approval</Label>
          </div>

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
        </CardContent>
      </Card>

      <Button type="submit" className="w-full">Create Event</Button>
    </form>
  )
}