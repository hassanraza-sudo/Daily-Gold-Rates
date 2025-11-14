import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Message sent successfully!",
      description: "We will get back to you as soon as possible.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return _jsxs("div", {
    className: "min-h-screen",
    children: [
      // Header Section
      _jsx(motion.section, {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
        className:
          "bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-gray-900 dark:to-gray-800 py-20",
        children: _jsxs("div", {
          className: "container mx-auto px-4 text-center",
          children: [
            _jsx("h1", {
              className:
                "text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent",
              children: "Contact Us",
            }),
            _jsx("p", {
              className: "text-lg text-muted-foreground max-w-2xl mx-auto",
              children:
                "Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
            }),
          ],
        }),
      }),

      // Contact Form Section
      _jsx("section", {
        className: "container mx-auto px-4 py-16",
        children: _jsx(motion.div, {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.3 },
          className: "max-w-2xl mx-auto",
          children: _jsxs(Card, {
            className: "shadow-lg",
            children: [
              _jsxs(CardHeader, {
                children: [
                  _jsx(CardTitle, { children: "Send us a message" }),
                  _jsx(CardDescription, {
                    children:
                      "Fill out the form below and we'll get back to you within 24 hours",
                  }),
                ],
              }),
              _jsx(CardContent, {
                children: _jsxs("form", {
                  onSubmit: handleSubmit,
                  className: "space-y-6",
                  children: [
                    _jsxs("div", {
                      className: "space-y-2",
                      children: [
                        _jsx(Label, { htmlFor: "name", children: "Name" }),
                        _jsx(Input, {
                          id: "name",
                          name: "name",
                          value: formData.name,
                          onChange: handleChange,
                          placeholder: "Your name",
                          required: true,
                        }),
                      ],
                    }),
                    _jsxs("div", {
                      className: "space-y-2",
                      children: [
                        _jsx(Label, { htmlFor: "email", children: "Email" }),
                        _jsx(Input, {
                          id: "email",
                          name: "email",
                          type: "email",
                          value: formData.email,
                          onChange: handleChange,
                          placeholder: "your.email@example.com",
                          required: true,
                        }),
                      ],
                    }),
                    _jsxs("div", {
                      className: "space-y-2",
                      children: [
                        _jsx(Label, {
                          htmlFor: "message",
                          children: "Message",
                        }),
                        _jsx(Textarea, {
                          id: "message",
                          name: "message",
                          value: formData.message,
                          onChange: handleChange,
                          placeholder: "Tell us how we can help you...",
                          rows: 6,
                          required: true,
                        }),
                      ],
                    }),
                    _jsxs(Button, {
                      type: "submit",
                      size: "lg",
                      className: "w-full bg-yellow-600 hover:bg-yellow-700",
                      children: [
                        _jsx(Send, { className: "mr-2 h-5 w-5" }),
                        "Send Message",
                      ],
                    }),
                  ],
                }),
              }),
            ],
          }),
        }),
      }),
    ],
  });
}
