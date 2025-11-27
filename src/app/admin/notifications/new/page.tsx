'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, Users, MessageSquare, Mail, Calendar, Check, Send } from 'lucide-react';
import Link from 'next/link';

const steps = [
  { id: 1, name: 'Basics', icon: Send, description: 'Campaign details & type' },
  { id: 2, name: 'Audience', icon: Users, description: 'Select target users' },
  { id: 3, name: 'Content', icon: MessageSquare, description: 'Craft your message' },
  { id: 4, name: 'Schedule', icon: Calendar, description: 'Set delivery time' },
  { id: 5, name: 'Review', icon: Check, description: 'Confirm and send' },
];

export default function NewCampaignPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignType, setCampaignType] = useState<'email' | 'sms' | 'both'>('email');

  const nextStep = () => setCurrentStep(prev => (prev < 5 ? prev + 1 : prev));
  const prevStep = () => setCurrentStep(prev => (prev > 1 ? prev - 1 : prev));

  return (
    <div className="space-y-6">
       <Link href="/admin/notifications" className="flex items-center text-sm text-muted-foreground hover:text-primary mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Campaigns
        </Link>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create New Campaign</h1>
        <p className="text-muted-foreground">A 5-step guide to sending notifications to your users.</p>
      </div>

      {/* Stepper */}
      <div className="flex justify-between border rounded-lg p-4">
        {steps.map(step => (
          <div key={step.id} className="flex-1 text-center">
            <div className={`mx-auto h-10 w-10 rounded-full flex items-center justify-center border-2 ${currentStep >= step.id ? 'bg-primary border-primary text-primary-foreground' : 'bg-muted border-border'}`}>
                <step.icon className="h-5 w-5" />
            </div>
            <p className={`mt-2 font-semibold ${currentStep >= step.id ? 'text-primary' : 'text-muted-foreground'}`}>{step.name}</p>
            <p className="text-xs text-muted-foreground">{step.description}</p>
          </div>
        ))}
      </div>

      <Card>
        {currentStep === 1 && (
            <>
                <CardHeader>
                    <CardTitle>Step 1: Campaign Basics</CardTitle>
                    <CardDescription>Give your campaign a name and choose the notification type.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="campaign-name">Campaign Name</Label>
                        <Input id="campaign-name" placeholder="e.g., 'Weekly Test Reminder'" />
                    </div>
                    <div className="space-y-2">
                        <Label>Campaign Type</Label>
                         <RadioGroup defaultValue="email" onValueChange={(value) => setCampaignType(value as any)} className="flex gap-4 pt-2">
                            <Label htmlFor="type-email" className="flex items-center gap-2 border rounded-md p-4 flex-1 cursor-pointer">
                                <RadioGroupItem value="email" id="type-email" />
                                <Mail className="h-5 w-5 mr-2" /> Email
                            </Label>
                             <Label htmlFor="type-sms" className="flex items-center gap-2 border rounded-md p-4 flex-1 cursor-pointer">
                                <RadioGroupItem value="sms" id="type-sms" />
                                <MessageSquare className="h-5 w-5 mr-2" /> SMS
                            </Label>
                             <Label htmlFor="type-both" className="flex items-center gap-2 border rounded-md p-4 flex-1 cursor-pointer">
                                <RadioGroupItem value="both" id="type-both" />
                                <div className="flex items-center"><Mail className="h-5 w-5 mr-1" />+<MessageSquare className="h-5 w-5 ml-1" /></div> Both
                            </Label>
                        </RadioGroup>
                    </div>
                </CardContent>
            </>
        )}
        {currentStep === 2 && (
            <>
                <CardHeader>
                    <CardTitle>Step 2: Audience</CardTitle>
                    <CardDescription>Select who should receive this campaign. Estimated recipients: 1,204</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                     <div className="space-y-2">
                        <Label>Target Users</Label>
                        <Select defaultValue="all">
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Users</SelectItem>
                                <SelectItem value="upsc">UPSC Aspirants</SelectItem>
                                <SelectItem value="ssc">SSC Aspirants</SelectItem>
                                <SelectItem value="banking">Banking Aspirants</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label>Advanced Filters</Label>
                        <div className="border p-4 rounded-lg space-y-4">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="filter-inactive" />
                                <Label htmlFor="filter-inactive">Exclude users inactive for more than 30 days.</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="filter-premium" />
                                <Label htmlFor="filter-premium">Only target premium members.</Label>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </>
        )}
        {currentStep === 3 && (
            <>
                <CardHeader>
                    <CardTitle>Step 3: Content</CardTitle>
                    <CardDescription>
                      Craft the message for your users. Use {'{{user_name}}'} for personalization.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {(campaignType === 'email' || campaignType === 'both') && (
                        <div className="space-y-4 border p-4 rounded-lg">
                            <h3 className="font-semibold flex items-center"><Mail className="mr-2"/>Email Content</h3>
                            <div className="space-y-2">
                                <Label htmlFor="email-subject">Subject Line</Label>
                                <Input id="email-subject" placeholder="Your test reminder" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email-body">Email Body</Label>
                                <Textarea id="email-body" placeholder="Hi {{user_name}}, here is your weekly reminder..." rows={8} />
                            </div>
                        </div>
                    )}
                     {(campaignType === 'sms' || campaignType === 'both') && (
                        <div className="space-y-4 border p-4 rounded-lg">
                            <h3 className="font-semibold flex items-center"><MessageSquare className="mr-2"/>SMS Content (160 chars)</h3>
                            <div className="space-y-2">
                                <Label htmlFor="sms-body">SMS Body</Label>
                                <Textarea id="sms-body" placeholder="Hi {{user_name}}, just a reminder..." maxLength={160} />
                                <p className="text-xs text-muted-foreground text-right">0/160 characters. Est. Cost: ₹0.00</p>
                            </div>
                        </div>
                    )}
                </CardContent>
            </>
        )}
        {currentStep === 4 && (
            <>
                <CardHeader>
                    <CardTitle>Step 4: Scheduling</CardTitle>
                    <CardDescription>Choose when to send this campaign.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                     <RadioGroup defaultValue="now" className="space-y-4">
                        <Label htmlFor="send-now" className="flex items-center gap-4 border rounded-md p-4 cursor-pointer">
                            <RadioGroupItem value="now" id="send-now" />
                            <div>
                                <h4 className="font-semibold">Send Immediately</h4>
                                <p className="text-sm text-muted-foreground">Start the campaign as soon as it's confirmed.</p>
                            </div>
                        </Label>
                         <Label htmlFor="send-later" className="flex items-center gap-4 border rounded-md p-4 cursor-pointer">
                            <RadioGroupItem value="later" id="send-later" />
                             <div>
                                <h4 className="font-semibold">Schedule for Later</h4>
                                <p className="text-sm text-muted-foreground">Specify a future date and time for delivery.</p>
                                 <div className="flex gap-2 mt-2">
                                    <Input type="date" className="w-auto" />
                                    <Input type="time" className="w-auto" />
                                 </div>
                            </div>
                        </Label>
                    </RadioGroup>
                </CardContent>
            </>
        )}
         {currentStep === 5 && (
            <>
                <CardHeader>
                    <CardTitle>Step 5: Review & Confirm</CardTitle>
                    <CardDescription>Please review all details before launching the campaign.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 p-4 border rounded-lg">
                    <h3 className="font-semibold">Campaign Summary</h3>
                    <p><strong>Name:</strong> Weekly Test Reminder</p>
                    <p><strong>Type:</strong> Email & SMS</p>
                    <p><strong>Audience:</strong> All Users (est. 10,234)</p>
                    <p><strong>Scheduled:</strong> Immediately</p>
                    <p><strong>Estimated Cost:</strong> ₹5,117.00</p>
                  </div>
                   <div className="flex items-start space-x-2 pt-4">
                        <Checkbox id="confirm-check" />
                        <div className="grid gap-1.5 leading-none">
                        <Label htmlFor="confirm-check" className="font-medium">
                            I have reviewed the campaign details and confirm the estimated cost.
                        </Label>
                        <p className="text-xs text-muted-foreground">
                            By launching this campaign, you agree to our terms of service.
                        </p>
                        </div>
                    </div>
                </CardContent>
            </>
        )}
        <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>Previous</Button>
            {currentStep < 5 && <Button onClick={nextStep}>Next</Button>}
            {currentStep === 5 && <Button variant="success">Launch Campaign</Button>}
        </CardFooter>
      </Card>
    </div>
  );
}
