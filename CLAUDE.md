@AGENTS.md

---

# 🧾 ARKNINE TECHNOLOGIES WEBSITE — PRODUCT REQUIREMENTS DOCUMENT (PRD)

Arknine Technologies requires a premium, modern, and institutional corporate website that clearly establishes credibility, communicates its business structure, and supports long-term scalability, particularly in preparation for investor engagement and public market positioning. The website must function as a long-term strategic asset, not a marketing experiment or a visually flashy interface.

The core objective of this product is to build a website that immediately conveys authority within the first few seconds of interaction, maintains a clean and structured layout throughout, and provides a seamless experience for both general users and investor stakeholders. The website must avoid all forms of visual clutter, startup-style gimmicks, or outdated corporate design patterns. It should instead rely on strong typography, controlled color usage, clear hierarchy, and whitespace to create a premium experience.

The target users of the website include investors, institutional stakeholders, business partners, manufacturers, and vendors. Secondary users include job applicants, media, and internal stakeholders. The experience must be optimized for clarity, trust, and usability rather than engagement tricks or excessive interactivity.

The website will consist of five primary sections: Homepage, About, Businesses, Contact, and Investor Relations. The Investor Relations section will further include Financial Results, Announcements, Governance, and Policies. This section is critical and must be treated as a document-first, highly structured, and easily navigable module, rather than a visually heavy or card-based interface.

The design system for the website is fixed and must not be altered. Headings will use the Prata typeface to establish authority and elegance, while all body text will use Avenir Next to ensure readability and modernity. The color system will be centered around Arknine Blue as the primary color for actions and highlights, with Muted Teal used sparingly as an accent. A cool greyscale palette will form the structural base of the UI. Semantic colors such as green, red, and yellow will be used strictly for status indications and must not overlap with the primary or accent palette.

The visual language must be premium, minimal, and highly structured. There must be a strong emphasis on whitespace, alignment, and typographic hierarchy. The interface must avoid heavy shadows, gradients, excessive borders, or decorative elements. No section of the website should feel crowded or overly designed. Every element must have a clear purpose and visual restraint.

The component system must be reusable and scalable. Core components will include navigation elements (navbar and footer), layout structures (page containers and section wrappers), UI elements (buttons, inputs, cards, tables, and status indicators), and content blocks (hero sections, business showcases, and structured content layouts). For the Investor Relations module, specialized components such as document lists, announcement lists, governance structures, and policy listings must be developed with a focus on clarity and usability. All components must be modular, consistent, and production-ready.

The homepage must serve as a high-level overview of the company while maintaining a premium and uncluttered feel. It should include a clear hero section with positioning, a concise company overview, a structured display of business verticals, a summary of services or capabilities, trust indicators, a preview of the Investor Relations section, and an optional newsletter subscription module. The homepage must not feel like a marketing landing page or a feature-heavy SaaS interface.

The About page must communicate the company’s identity through sections such as company overview, mission, vision, and philosophy. It must avoid large blocks of unstructured text and instead present information in a clear, readable, and well-spaced format.

The Businesses page must present Arknine’s business verticals in a structured and sophisticated manner. Each business unit should be clearly defined with its role, positioning, and value proposition. The layout must remain controlled and avoid visual noise or excessive differentiation between units.

The Contact page must be simple, clean, and trustworthy. It should include company contact details, an inquiry form, optional map integration, and relevant investor contact information. The form must be minimal and aligned with the design system.

The Investor Relations section must be designed with a document-first approach. The IR Home page should provide a clear introduction, highlight the latest updates, and offer quick navigation to key sections. The Financial Results page must organize documents by year and type, ensuring easy access to quarterly and annual reports. The Announcements page must display updates in reverse chronological order with clear metadata such as title and date. The Governance page must include board members, committees, and governance-related documents, presented in a structured and professional format. The Policies page must provide categorized document lists with a clean and minimal layout.

The website must be built using Next.js with the App Router, TypeScript for type safety, and Tailwind CSS for styling. The architecture must support scalability, component reuse, and clean separation between layout, components, and content. The codebase must be organized, maintainable, and production-ready.

A newsletter subscription system must be integrated to capture user emails. This system should be positioned as a value-driven offering such as “Textile Intelligence” rather than a generic newsletter. It must be integrated with a service such as Brevo or Mailchimp and include an automated welcome response. Placement should include the homepage and Investor Relations section.

The website must be fully responsive across all devices. Mobile responsiveness must not be treated as an afterthought but as an integral part of the layout system. Typography, spacing, and component behavior must adapt seamlessly across screen sizes without breaking hierarchy or usability.

Accessibility must be ensured through semantic HTML, proper heading structure, keyboard navigation, visible focus states, and sufficient color contrast. Performance must be optimized through efficient asset loading, minimal JavaScript usage, and fast rendering times.

The success of the website will be measured through user engagement metrics such as time on site, interaction with Investor Relations pages, document downloads, newsletter subscriptions, and bounce rate. However, the primary qualitative measure will be whether the website feels premium, credible, and structured.

The biggest risks in this project include the website appearing generic or template-based, becoming over-designed with unnecessary elements, failing to deliver a strong Investor Relations experience, or lacking consistency in the design system. These risks must be actively avoided through disciplined execution.

The development process should follow a structured sequence beginning with architecture and design system implementation, followed by global layout and component development, then page-by-page construction, Investor Relations module implementation, and finally responsiveness, accessibility, performance optimization, and visual refinement.

The final product must not resemble a startup SaaS interface, a generic template, an over-designed marketing page, or an outdated corporate website. It must instead present Arknine Technologies as a modern, credible, and institution-ready company through a clean, structured, and premium digital experience.

---

# 🚨 Final Instruction (Non-Negotiable)

If any part of the implementation:

* feels generic
* looks like a template
* is visually noisy
* or lacks hierarchy

it must be rejected and refined.

Premium is not achieved through decoration.
It is achieved through **discipline, restraint, and precision**.
Always follow the brand guidelines and design system.

## graphify

This project has a graphify knowledge graph at graphify-out/.

Rules:
- Before answering architecture or codebase questions, read graphify-out/GRAPH_REPORT.md for god nodes and community structure
- If graphify-out/wiki/index.md exists, navigate it instead of reading raw files
- After modifying code files in this session, run `python3 -c "from graphify.watch import _rebuild_code; from pathlib import Path; _rebuild_code(Path('.'))"` to keep the graph current
