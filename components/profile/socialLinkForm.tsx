'use client'
import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import axios from 'axios'
import { useSession } from 'next-auth/react'

export default function SocialForm() {
  const [twitterUrl, setTwitterUrl] = useState('')
  const [linkedinUrl, setLinkedinUrl] = useState('')
  const [error, setError] = useState('')
  const session = useSession()
  
  const editSocialLinks = async () => {
    const res = await axios.put('http://localhost:3000/api/user', {
      email: session?.data?.user?.email,
      twitterUrl: twitterUrl,
      linkedinUrl: linkedinUrl
    })
    return res
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const twitterRegex = /^https?:\/\/(www\.)?x\.com\/[a-zA-Z0-9_]+\/?$/
    const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/

    if (!twitterRegex.test(twitterUrl)) {
      setError('Invalid Twitter URL')
      return
    }

    if (!linkedinRegex.test(linkedinUrl)) {
      setError('Invalid LinkedIn URL')
      return
    }

    // Here you would typically send the data to your backend
    editSocialLinks()
    // Reset form after successful submission
    setTwitterUrl('')
    setLinkedinUrl('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full bg-white rounded-lg">
      <div className="space-y-2">
        <Label htmlFor="twitter">Twitter URL</Label>
        <Input
          id="twitter"
          type="url"
          placeholder="https://twitter.com/yourusername"
          value={twitterUrl}
          onChange={(e) => setTwitterUrl(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="linkedin">LinkedIn URL</Label>
        <Input
          id="linkedin"
          type="url"
          placeholder="https://linkedin.com/in/yourusername"
          value={linkedinUrl}
          onChange={(e) => setLinkedinUrl(e.target.value)}
          required
        />
      </div>
      
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  )
}