<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ModuleGrantMail extends Mailable
{
    use Queueable, SerializesModels;

    protected $user;
    protected $module_week;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($user, $module_week)
    {
        $this->user = $user;
        $this->module_week = $module_week;
    }

    /**
     * Get the message envelope.
     *
     * @return \Illuminate\Mail\Mailables\Envelope
     */
    public function envelope()
    {
        return new Envelope(
            subject: 'Module week ' . $this->module_week . ' is now open !',
        );
    }

    /**
     * Get the message content definition.
     *
     * @return \Illuminate\Mail\Mailables\Content
     */
    public function content()
    {
        return new Content(
            view: 'emails.module_grant',
            with: [
                'user' => $this->user,
                'module_week' => $this->module_week
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array
     */
    public function attachments()
    {
        return [];
    }
}
