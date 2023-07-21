import dotenv from 'dotenv';
import nodemailer, {SentMessageInfo, Transporter, SendMailOptions} from 'nodemailer';
import pQueue from 'p-queue';
dotenv.config();

export class EmailService {
    private transporter: Transporter;
    private queue: pQueue;
    private fromMail: string = '"TMS project" nvtcompt@gmail.com';
    constructor(concurrency: number) {
        this.transporter = nodemailer.createTransport(
            {
                host: process.env.EMAIL_HOST || 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: process.env.EMAIL_ID || 'nvtcompt@gmail.com',
                    pass: process.env.EMAIL_PWD || 'ugsnudemafadgsjq',
                },
            },
            {from: this.fromMail},
        );
        this.queue = new pQueue({concurrency: concurrency, interval: 1000});
    }

    async sendEmail(mailOptions: SendMailOptions): Promise<SentMessageInfo> {
        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log(`Email sent to ${mailOptions.to} with message ${info.messageId}`);
        } catch (error) {
            console.error(`Error sending email to ${mailOptions.to}: ${error}`);
        }
    }

    async sendBatchEmail(mailOptionsList: any[]): Promise<any> {
        const PromiseList = mailOptionsList.map((mailOptions) => {
            return this.queue.add(() => this.sendEmail(mailOptions));
        });
        await Promise.all(PromiseList);
        console.log('All emails sent successfully');
    }
}
