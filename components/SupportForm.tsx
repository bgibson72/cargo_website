"use client";

import { useState, useRef, FormEvent, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

const OS_OPTIONS: Record<string, string[]> = {
  iPhone: ["iOS 26", "iOS 18", "iOS 17", "Other OS version"],
  iPad:   ["iPadOS 26", "iPadOS 18", "iPadOS 17", "Other OS version"],
  Mac:    ["macOS 26 Tahoe", "macOS 15 Sequoia", "macOS 14 Sonoma", "macOS 13 Ventura", "Other OS version"],
};

const FIELD_STYLE: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: 10,
  border: "1px solid var(--border)",
  backgroundColor: "var(--bg)",
  color: "var(--text)",
  fontSize: 14,
  outline: "none",
  transition: "border-color 0.2s",
};

const LABEL_STYLE: React.CSSProperties = {
  display: "block",
  fontSize: 13,
  fontWeight: 600,
  marginBottom: 6,
  color: "var(--text-muted)",
};

type Status = "idle" | "sending" | "success" | "error";

export default function SupportForm({ onClose }: { onClose: () => void }) {
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [device, setDevice]     = useState("");
  const [os, setOs]             = useState("");
  const [description, setDesc]  = useState("");
  const [fileName, setFileName] = useState("");
  const [status, setStatus]     = useState<Status>("idle");
  const [errors, setErrors]     = useState<Record<string, string>>({});
  const fileRef = useRef<HTMLInputElement>(null);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!email.trim())       e.email       = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email.";
    if (!device)             e.device      = "Please select a device.";
    if (!os)                 e.os          = "Please select an OS version.";
    if (!description.trim()) e.description = "Please describe your issue.";
    return e;
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileName(file ? file.name : "");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus("sending");

    try {
      const formData = new FormData();
      formData.append("name",        name);
      formData.append("email",       email);
      formData.append("device",      device);
      formData.append("os",          os);
      formData.append("description", description);
      if (fileRef.current?.files?.[0]) {
        formData.append("screenshot", fileRef.current.files[0]);
      }

      const res = await fetch("/api/support", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Server error");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const inputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = "var(--accent)";
  };
  const inputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = "var(--border)";
  };

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ type: "spring", stiffness: 340, damping: 30 }}
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl p-7"
        style={{ backgroundColor: "var(--bg-surface)", border: "1px solid var(--border)" }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center hover:opacity-70 transition-opacity"
          style={{ backgroundColor: "var(--border)", color: "var(--text)" }}
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-1" style={{ color: "var(--text)" }}>
          Contact Support
        </h2>
        <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
          We&apos;ll get back to you as soon as possible.
        </p>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-10"
            >
              <div className="text-5xl mb-4">📬</div>
              <p className="text-lg font-semibold mb-2" style={{ color: "var(--text)" }}>
                Message sent!
              </p>
              <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
                Thanks for reaching out. We&apos;ll reply to {email} shortly.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-full text-sm font-semibold"
                style={{ backgroundColor: "var(--accent)", color: "#fff" }}
              >
                Done
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-5"
            >
              {/* Name */}
              <div>
                <label style={LABEL_STYLE}>Name <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>(optional)</span></label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  style={FIELD_STYLE}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                />
              </div>

              {/* Email */}
              <div>
                <label style={LABEL_STYLE}>
                  Email <span style={{ color: "var(--accent)" }}>*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  style={{
                    ...FIELD_STYLE,
                    borderColor: errors.email ? "#e05c5c" : "var(--border)",
                  }}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                />
                {errors.email && <p className="text-xs mt-1" style={{ color: "#e05c5c" }}>{errors.email}</p>}
              </div>

              {/* Device */}
              <div>
                <label style={LABEL_STYLE}>
                  Device <span style={{ color: "var(--accent)" }}>*</span>
                </label>
                <select
                  value={device}
                  onChange={(e) => { setDevice(e.target.value); setOs(""); }}
                  style={{
                    ...FIELD_STYLE,
                    borderColor: errors.device ? "#e05c5c" : "var(--border)",
                  }}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                >
                  <option value="">Select device…</option>
                  {Object.keys(OS_OPTIONS).map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                {errors.device && <p className="text-xs mt-1" style={{ color: "#e05c5c" }}>{errors.device}</p>}
              </div>

              {/* OS Version — only shown when device is selected */}
              <AnimatePresence>
                {device && (
                  <motion.div
                    key="os"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ overflow: "hidden" }}
                  >
                    <label style={LABEL_STYLE}>
                      OS Version <span style={{ color: "var(--accent)" }}>*</span>
                    </label>
                    <select
                      value={os}
                      onChange={(e) => setOs(e.target.value)}
                      style={{
                        ...FIELD_STYLE,
                        borderColor: errors.os ? "#e05c5c" : "var(--border)",
                      }}
                      onFocus={inputFocus}
                      onBlur={inputBlur}
                    >
                      <option value="">Select version…</option>
                      {OS_OPTIONS[device].map((v) => (
                        <option key={v} value={v}>{v}</option>
                      ))}
                    </select>
                    {errors.os && <p className="text-xs mt-1" style={{ color: "#e05c5c" }}>{errors.os}</p>}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Description */}
              <div>
                <label style={LABEL_STYLE}>
                  Describe your issue <span style={{ color: "var(--accent)" }}>*</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Tell us what happened…"
                  rows={5}
                  style={{
                    ...FIELD_STYLE,
                    resize: "vertical",
                    borderColor: errors.description ? "#e05c5c" : "var(--border)",
                  }}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                />
                {errors.description && <p className="text-xs mt-1" style={{ color: "#e05c5c" }}>{errors.description}</p>}
              </div>

              {/* Screenshot */}
              <div>
                <label style={LABEL_STYLE}>
                  Screenshot <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>(optional)</span>
                </label>
                <div
                  className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors"
                  style={{ border: "1px dashed var(--border)", backgroundColor: "var(--bg)" }}
                  onClick={() => fileRef.current?.click()}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                  <span className="text-sm" style={{ color: fileName ? "var(--text)" : "var(--text-muted)" }}>
                    {fileName || "Click to attach a screenshot…"}
                  </span>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFile}
                  />
                </div>
              </div>

              {/* Error banner */}
              {status === "error" && (
                <p className="text-sm text-center py-2 rounded-lg" style={{ backgroundColor: "rgba(224,92,92,0.12)", color: "#e05c5c" }}>
                  Something went wrong. Please try again or email us directly at{" "}
                  <a href="mailto:bryan.j.gibson@icloud.com" className="underline">bryan.j.gibson@icloud.com</a>.
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-3 rounded-full text-sm font-semibold transition-opacity"
                style={{
                  backgroundColor: "var(--accent)",
                  color: "#fff",
                  opacity: status === "sending" ? 0.7 : 1,
                }}
              >
                {status === "sending" ? "Sending…" : "Send Message"}
              </button>

              <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
                <span style={{ color: "var(--accent)" }}>*</span> Required fields
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
