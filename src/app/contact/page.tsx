import { Metadata } from "next";
import { company } from "@/data/company";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { DarkHero } from "@/components/shared/DarkHero";
import { IndiaMap } from "@/components/sections/IndiaMap";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Arknine Technologies",
  description: "Get in touch with Arknine Technologies. Offices in Mumbai with operations expanding across India.",
};

export default function ContactPage() {
  return (
    <>
      <DarkHero
        eyebrow="Contact"
        title="Get in touch"
        description="Headquartered in Mumbai with Dukaan Dost operations expanding across major textile hubs in India."
      />

      {/* Offices */}
      <section className="page-wrapper">
        <div className="section">
          <div className="contact-offices">
            <RevealOnScroll>
              <div className="contact-office">
                <span className="eyebrow">Registered Office</span>
                <h3 className="contact-office__name">Kapadia Chamber</h3>
                <p className="contact-office__address">Mumbai, Maharashtra, India</p>
                <a href={`mailto:${company.contacts.investorEmail}`} className="contact-office__email">
                  {company.contacts.investorEmail}
                </a>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={1}>
              <div className="contact-office">
                <span className="eyebrow">Experience Centre</span>
                <h3 className="contact-office__name">Kalbadevi</h3>
                <p className="contact-office__address">Mumbai, Maharashtra, India</p>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={2}>
              <div className="contact-office">
                <span className="eyebrow">Registrar & Transfer Agent</span>
                <h3 className="contact-office__name">{company.rta.name}</h3>
                <p className="contact-office__address">Share transfer and investor services</p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* India Map */}
      <section className="section-bg-alt">
        <div className="page-wrapper">
          <div className="section" style={{ borderTop: "none" }}>
            <RevealOnScroll>
              <div className="section-header">
                <span className="eyebrow">Presence</span>
                <h2>Our Locations</h2>
                <p>
                  Operations across major textile hubs in India, with global
                  sourcing from China, Vietnam, and Indonesia.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={1}>
              <IndiaMap />
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="page-wrapper">
        <div className="section">
          <RevealOnScroll>
            <div className="section-header">
              <span className="eyebrow">Enquiry</span>
              <h2>Send us a message</h2>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={1}>
            <ContactForm />
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
