import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { Resend } from 'resend';
import dotenv from 'dotenv';
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get("/health", (req, res) => {
    res.json({
      status: "ok",
      timestamp: new Date().toISOString()
    });
  });

  // API route for consultation notification
  app.post("/api/notify-consultation", async (req, res) => {
    console.log("Consultation click registered");
    
    if (resend) {
      try {
        await resend.emails.send({
          from: 'Lead Tracking <onboarding@resend.dev>',
          to: 'info@ipdm.co.in',
          subject: 'New Consultation Click Registered',
          html: `<p>A user just clicked the <strong>Request Consultation</strong> button on the IPDM website.</p>
                 <p>They are currently being shown the Calendly popup to book a meeting.</p>
                 <p>Time: ${new Date().toLocaleString()}</p>`
        });
        console.log("Email notification sent to info@ipdm.co.in");
      } catch (error) {
        console.error("Failed to send email:", error);
      }
    } else {
      console.warn("RESEND_API_KEY not found. skipping email notification.");
    }

    res.json({ success: true });
  });

  // Velocity Lead Generation Endpoint
  app.post("/api/velocity/generate-leads", async (req, res) => {
    const { businessDescription } = req.body;
    if (!businessDescription) {
      return res.status(400).json({ error: "Business description is required" });
    }

    try {
      const { generateVelocityLeads } = await import("./src/services/velocityService");
      const result = await generateVelocityLeads(businessDescription);
      res.json(result);
    } catch (error: any) {
      console.error("Velocity API Error:", error);
      res.status(500).json({ error: error.message || "Failed to generate leads" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
