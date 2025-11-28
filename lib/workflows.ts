import {Client as WorkflowClient} from "@upstash/workflow"
import { Client as QStachClient, resend } from "@upstash/qstash";
import config from "./config"

export const workflowClient = new WorkflowClient({
    baseUrl: config.env.upstash.qstashUrl,
    token: config.env.upstash.qstashToken,
})

const qstachClient = new QStachClient({ token: config.env.upstash.qstashToken });

export const sendEmail = async ({email, subject, message}: {email: string, subject: string, message: string}) => {
    await qstachClient.publishJSON({
    api: {
        name: "email",
        provider: resend({ token: config.env.resendToken }),
    },
    body: {
        from: "404Ryan <rydhlnst@gmail.com>",
        to: [email],
        subject,
        html: message
    },
    });
}

