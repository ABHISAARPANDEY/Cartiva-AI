import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { supabase, isSupabaseConfigured } from "./lib/supabase";
import { insertDemoRequestSchema, insertContactSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ 
      status: "ok", 
      timestamp: new Date().toISOString(),
      supabase: isSupabaseConfigured() ? "connected" : "not configured"
    });
  });

  // Demo request submission
  app.post("/api/demo-request", async (req, res) => {
    try {
      const result = insertDemoRequestSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          error: "Invalid form data", 
          details: result.error.flatten() 
        });
      }

      if (!isSupabaseConfigured()) {
        // Log the request if Supabase is not configured (for development)
        console.log("Demo request received (Supabase not configured):", result.data);
        return res.json({ 
          success: true, 
          message: "Demo request received (development mode)" 
        });
      }

      const { data, error } = await supabase!
        .from("demo_requests")
        .insert({
          first_name: result.data.firstName,
          last_name: result.data.lastName,
          email: result.data.email,
          website: result.data.website,
          industry: result.data.industry,
          message: result.data.message || null,
        })
        .select()
        .single();

      if (error) {
        console.error("Supabase error:", error);
        return res.status(500).json({ error: "Failed to save demo request" });
      }

      res.json({ success: true, id: data.id });
    } catch (error) {
      console.error("Error processing demo request:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const result = insertContactSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          error: "Invalid form data", 
          details: result.error.flatten() 
        });
      }

      if (!isSupabaseConfigured()) {
        console.log("Contact submission received (Supabase not configured):", result.data);
        return res.json({ 
          success: true, 
          message: "Contact submission received (development mode)" 
        });
      }

      const { data, error } = await supabase!
        .from("contact_submissions")
        .insert({
          name: result.data.name,
          email: result.data.email,
          subject: result.data.subject || null,
          message: result.data.message,
        })
        .select()
        .single();

      if (error) {
        console.error("Supabase error:", error);
        return res.status(500).json({ error: "Failed to save contact submission" });
      }

      res.json({ success: true, id: data.id });
    } catch (error) {
      console.error("Error processing contact submission:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  return httpServer;
}
