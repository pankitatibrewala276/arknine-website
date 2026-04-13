/* ============================================================
   BLOG & PR — Data Types & Dummy Content
   ============================================================ */

export type PostCategory = "Blog" | "PR" | "Event";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: PostCategory;
  tags: string[];
  date: string;          // ISO date string
  readTime: number;      // minutes
  image: string;
  excerpt: string;
  content: string;       // structured HTML content
  featured?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Tag list (for filters)                                             */
/* ------------------------------------------------------------------ */
export const allTags = [
  "Sustainability",
  "Innovation",
  "Supply Chain",
  "Textile",
  "Technology",
  "Growth",
  "Partnerships",
  "Finance",
  "ESG",
  "Manufacturing",
] as const;

export type PostTag = (typeof allTags)[number];

/* ------------------------------------------------------------------ */
/*  Helper — structured article content                                */
/* ------------------------------------------------------------------ */
function articleContent(sections: { heading: string; paragraphs: string[] }[]): string {
  return sections
    .map(
      (s) =>
        `<h2>${s.heading}</h2>\n${s.paragraphs.map((p) => `<p>${p}</p>`).join("\n")}`
    )
    .join("\n\n");
}

/* ------------------------------------------------------------------ */
/*  Posts                                                               */
/* ------------------------------------------------------------------ */
export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "arknine-q3-fy25-revenue-growth",
    title: "Arknine Reports 42% Revenue Growth in Q3 FY25",
    category: "PR",
    tags: ["Finance", "Growth"],
    date: "2025-12-18",
    readTime: 4,
    image: "https://picsum.photos/seed/arknine-q3/1200/680",
    excerpt:
      "Arknine Technologies Limited posted strong quarterly results with consolidated revenue reaching INR 127 crore, marking a 42% year-over-year increase driven by robust demand across textile verticals.",
    featured: true,
    content: articleContent([
      {
        heading: "Quarterly Highlights",
        paragraphs: [
          "Arknine Technologies Limited reported consolidated revenue of INR 127 crore for Q3 FY25, reflecting a 42% year-over-year increase compared to INR 89.4 crore in the corresponding quarter of the previous fiscal year. The company attributed this growth to expanding operations across its Dukaan Dost platform and the Monotone brand.",
          "EBITDA margins improved to 14.8%, up from 11.2% in Q3 FY24, driven by operational efficiencies and a higher proportion of technology-enabled transactions flowing through the platform. Net profit for the quarter stood at INR 8.6 crore.",
        ],
      },
      {
        heading: "Operational Momentum",
        paragraphs: [
          "The company processed over 18,000 unique SKUs during the quarter, with the Dukaan Dost platform handling transactions from 2,400 active manufacturers. Repeat order rates climbed to 73%, indicating strong platform stickiness and customer retention across key markets.",
          "Management highlighted that the integrated sourcing-financing model continued to differentiate Arknine from traditional textile intermediaries, with trade finance disbursements growing 38% quarter-over-quarter.",
        ],
      },
      {
        heading: "Outlook",
        paragraphs: [
          "Looking ahead, Arknine reaffirmed its full-year revenue guidance of INR 480-510 crore, with the management team expressing confidence in sustained momentum through Q4 FY25. Investments in technology infrastructure and warehouse expansion in Vietnam are expected to support medium-term growth.",
        ],
      },
    ]),
  },
  {
    id: "2",
    slug: "sustainable-textile-supply-chain-initiative",
    title: "Launching Our Sustainable Textile Supply Chain Initiative",
    category: "Blog",
    tags: ["Sustainability", "Supply Chain", "ESG"],
    date: "2025-11-28",
    readTime: 6,
    image: "https://picsum.photos/seed/sustain-tex/1200/680",
    excerpt:
      "How Arknine is embedding sustainability metrics into every layer of the textile supply chain — from raw material sourcing to last-mile delivery.",
    content: articleContent([
      {
        heading: "A Systemic Approach to Sustainability",
        paragraphs: [
          "The textile industry accounts for approximately 10% of global carbon emissions and 20% of global wastewater. These are not abstract figures — they represent the environmental cost of an industry that touches billions of lives. At Arknine, we believe that addressing this challenge requires systemic change, not isolated gestures.",
          "Our Sustainable Supply Chain Initiative, launched in November 2025, introduces a comprehensive framework for measuring, reporting, and improving environmental performance across every transaction processed through the Arknine ecosystem.",
        ],
      },
      {
        heading: "Measuring What Matters",
        paragraphs: [
          "The initiative introduces three core metrics tracked at the transaction level: water consumption per unit, carbon intensity per shipment, and waste generation per production cycle. These metrics are integrated directly into the Dukaan Dost platform, giving manufacturers and buyers visibility into the environmental footprint of their procurement decisions.",
          "Early pilot data from 340 manufacturers across Gujarat and Maharashtra shows an average 18% reduction in water usage among participants who adopted the recommended sourcing adjustments within the first 90 days.",
        ],
      },
      {
        heading: "Building an Ecosystem, Not a Checklist",
        paragraphs: [
          "Sustainability in textile trade cannot be reduced to a compliance checkbox. Our approach focuses on economic alignment — making sustainable practices the more cost-effective option through preferential financing rates, reduced platform fees, and priority access to international buyers who mandate ESG compliance.",
          "We are committed to publishing quarterly sustainability reports beginning Q1 FY26, providing transparent data on the environmental impact of the Arknine ecosystem.",
        ],
      },
    ]),
  },
  {
    id: "3",
    slug: "textile-innovation-summit-2025",
    title: "Textile Innovation Summit 2025 — Mumbai",
    category: "Event",
    tags: ["Innovation", "Textile", "Technology"],
    date: "2025-11-15",
    readTime: 3,
    image: "https://picsum.photos/seed/summit-25/1200/680",
    excerpt:
      "Arknine co-hosted the annual Textile Innovation Summit in Mumbai, bringing together 600+ industry leaders to discuss the future of technology-driven textile commerce.",
    content: articleContent([
      {
        heading: "Event Overview",
        paragraphs: [
          "The Textile Innovation Summit 2025, co-hosted by Arknine Technologies and the Textile Association of India, took place on November 15-16 at the Jio World Convention Centre, Mumbai. Over 600 industry professionals, technology leaders, and institutional investors gathered to explore the intersection of technology and textile trade.",
          "The two-day event featured 28 sessions across four tracks: Supply Chain Digitization, Trade Finance Innovation, Sustainable Manufacturing, and Emerging Market Expansion.",
        ],
      },
      {
        heading: "Key Discussions",
        paragraphs: [
          "Arknine CEO delivered the opening keynote on 'Infrastructure as Competitive Advantage in Textile Commerce,' outlining how integrated technology platforms are reshaping procurement patterns across South and Southeast Asian markets.",
          "Panel discussions highlighted the growing importance of real-time supply chain visibility, with multiple participants noting that digitization is no longer optional for manufacturers seeking to serve international buyers with ESG mandates.",
        ],
      },
      {
        heading: "Looking Forward",
        paragraphs: [
          "The summit concluded with the announcement of the Textile Innovation Lab, a collaborative initiative between Arknine and three leading textile engineering institutes. The Lab will focus on developing open-source tools for supply chain traceability and environmental impact measurement.",
        ],
      },
    ]),
  },
  {
    id: "4",
    slug: "dukaan-dost-platform-2-launch",
    title: "Dukaan Dost Platform 2.0: Redesigned for Scale",
    category: "Blog",
    tags: ["Technology", "Innovation", "Growth"],
    date: "2025-10-22",
    readTime: 5,
    image: "https://picsum.photos/seed/dd-platform/1200/680",
    excerpt:
      "A deep dive into the architectural decisions behind Dukaan Dost 2.0 — built to handle 10x transaction volume with sub-second response times.",
    content: articleContent([
      {
        heading: "Why We Rebuilt",
        paragraphs: [
          "When Dukaan Dost launched in 2021, the platform was designed to handle 200 concurrent transactions. By mid-2025, peak loads had grown to over 3,000 concurrent sessions, with the platform processing an average of INR 4.2 crore in daily transaction value. The original architecture, while serviceable, was approaching its limits.",
          "Platform 2.0 represents a ground-up rearchitecture focused on three priorities: horizontal scalability, real-time inventory synchronization, and a dramatically improved manufacturer onboarding experience.",
        ],
      },
      {
        heading: "Technical Architecture",
        paragraphs: [
          "The new architecture moves from a monolithic backend to a distributed microservices model, with dedicated services for catalog management, order processing, trade finance, and logistics coordination. Event-driven communication between services ensures that inventory changes propagate across the system within 200 milliseconds.",
          "On the frontend, we adopted a progressive enhancement approach — the core purchasing workflow functions without JavaScript, while enhanced features like real-time price comparison and predictive inventory alerts layer on top for users with modern browsers.",
        ],
      },
      {
        heading: "Early Results",
        paragraphs: [
          "Since launching Platform 2.0 in October 2025, average page load times have decreased from 3.2 seconds to 0.8 seconds. Manufacturer onboarding time has dropped from 14 days to 3 days. Transaction processing capacity has increased to support 30,000 concurrent sessions without performance degradation.",
        ],
      },
    ]),
  },
  {
    id: "5",
    slug: "arknine-bse-listing-anniversary",
    title: "Arknine Marks Two Years on BSE with Strategic Milestones",
    category: "PR",
    tags: ["Finance", "Growth"],
    date: "2025-10-05",
    readTime: 3,
    image: "https://picsum.photos/seed/bse-anniv/1200/680",
    excerpt:
      "Reflecting on two years since listing on the Bombay Stock Exchange — a journey of disciplined growth, operational expansion, and shareholder value creation.",
    content: articleContent([
      {
        heading: "Two Years of Public Market Presence",
        paragraphs: [
          "Arknine Technologies Limited celebrated the second anniversary of its listing on the Bombay Stock Exchange (BSE) on October 5, 2025. Since its debut, the company has achieved significant operational and financial milestones that underscore its positioning as a technology-driven textile infrastructure platform.",
          "Over the past 24 months, consolidated revenue has grown from INR 186 crore in FY23 to an annualized run rate of INR 500+ crore, representing a compound annual growth rate of approximately 64%.",
        ],
      },
      {
        heading: "Strategic Milestones",
        paragraphs: [
          "Key achievements since listing include: expansion into three international markets (China, Vietnam, Indonesia), launch of the integrated trade finance product, acquisition of the Monotone brand vertical, and reaching 5,000+ active manufacturers on the Dukaan Dost platform.",
          "The company maintains a strong balance sheet with net cash of INR 42 crore and no long-term debt, providing flexibility for continued organic and inorganic growth.",
        ],
      },
    ]),
  },
  {
    id: "6",
    slug: "vietnam-operations-expansion",
    title: "Expanding Operations in Vietnam: A Strategic Overview",
    category: "Blog",
    tags: ["Growth", "Supply Chain", "Manufacturing"],
    date: "2025-09-18",
    readTime: 7,
    image: "https://picsum.photos/seed/vietnam-ops/1200/680",
    excerpt:
      "Vietnam represents Arknine's fastest-growing international market. Here's how we're building local infrastructure to support long-term growth in Southeast Asia.",
    content: articleContent([
      {
        heading: "The Vietnam Opportunity",
        paragraphs: [
          "Vietnam's textile and garment export industry generated USD 44 billion in 2024, making it the third-largest textile exporter globally. Yet the domestic supply chain remains fragmented, with limited technology adoption among mid-sized manufacturers who form the backbone of the industry.",
          "Arknine entered the Vietnamese market in early 2024 through a partnership with local logistics operators in Ho Chi Minh City. Within 18 months, the Vietnam operation has grown to include 480 active manufacturers on the platform, with monthly transaction volume exceeding USD 12 million.",
        ],
      },
      {
        heading: "Local Infrastructure Investment",
        paragraphs: [
          "In September 2025, Arknine announced a USD 3.2 million investment in warehouse and quality control infrastructure across three Vietnamese provinces. The investment includes a 15,000 square-foot fulfillment center in Binh Duong province, quality inspection facilities in Da Nang, and a regional office expansion in Ho Chi Minh City.",
          "The local team has grown from 8 to 34 employees, with dedicated teams for manufacturer relations, quality assurance, and platform operations.",
        ],
      },
      {
        heading: "Integration with the Arknine Ecosystem",
        paragraphs: [
          "Vietnamese manufacturers on the Dukaan Dost platform now have access to the full Arknine ecosystem, including cross-border trade finance, real-time inventory visibility for international buyers, and integrated logistics coordination. This end-to-end integration is a key differentiator in a market where most competitors offer point solutions.",
        ],
      },
    ]),
  },
  {
    id: "7",
    slug: "trade-finance-product-launch",
    title: "Arknine Launches Integrated Trade Finance for Textile SMEs",
    category: "PR",
    tags: ["Finance", "Innovation", "Technology"],
    date: "2025-09-02",
    readTime: 4,
    image: "https://picsum.photos/seed/tradefin/1200/680",
    excerpt:
      "A new embedded finance product enabling textile manufacturers and buyers to access working capital directly within the Dukaan Dost platform.",
    content: articleContent([
      {
        heading: "Bridging the Credit Gap",
        paragraphs: [
          "Small and medium textile enterprises in India face a persistent credit gap estimated at INR 3.8 lakh crore. Traditional lending institutions often lack the industry expertise and data infrastructure to accurately assess the creditworthiness of textile businesses, resulting in high rejection rates and slow disbursement times.",
          "Arknine's Integrated Trade Finance product addresses this gap by leveraging the transaction data generated on the Dukaan Dost platform to provide risk-assessed working capital to verified manufacturers and buyers.",
        ],
      },
      {
        heading: "Product Details",
        paragraphs: [
          "The product offers working capital lines of INR 5 lakh to INR 2 crore, with disbursement within 48 hours of approval. Interest rates are determined by a proprietary credit scoring model that incorporates platform transaction history, payment behavior, inventory turnover, and buyer diversity metrics.",
          "Arknine partners with two NBFC partners for the lending capital, while retaining the credit assessment and collection functions. This asset-light model allows rapid scaling while maintaining balance sheet discipline.",
        ],
      },
      {
        heading: "Early Traction",
        paragraphs: [
          "Within the first 60 days of launch, the trade finance product has disbursed INR 34 crore across 186 manufacturers. The average ticket size is INR 18.3 lakh, with a 96% on-time repayment rate. Management expects the trade finance vertical to contribute 8-12% of consolidated revenue by FY26.",
        ],
      },
    ]),
  },
  {
    id: "8",
    slug: "annual-sustainability-report-fy25",
    title: "FY25 Sustainability Report: Progress and Commitments",
    category: "PR",
    tags: ["Sustainability", "ESG"],
    date: "2025-08-20",
    readTime: 5,
    image: "https://picsum.photos/seed/sustain-rpt/1200/680",
    excerpt:
      "Our first comprehensive sustainability report covering environmental, social, and governance performance across all Arknine operations.",
    content: articleContent([
      {
        heading: "Our First Sustainability Report",
        paragraphs: [
          "Arknine Technologies is pleased to publish its inaugural Sustainability Report for FY25, providing a comprehensive overview of the company's environmental, social, and governance performance across all domestic and international operations.",
          "This report has been prepared in alignment with GRI Standards and covers the reporting period from April 2024 to March 2025.",
        ],
      },
      {
        heading: "Environmental Performance",
        paragraphs: [
          "Through the Sustainable Supply Chain Initiative, Arknine-facilitated transactions achieved a 14% average reduction in water consumption and an 11% reduction in carbon intensity per unit compared to industry benchmarks. The company's direct operations maintained carbon neutrality through a combination of renewable energy procurement and verified carbon offsets.",
          "Waste diversion from landfill reached 78% across company-operated facilities, with a target of 90% by FY27.",
        ],
      },
      {
        heading: "Social Impact",
        paragraphs: [
          "The Arknine ecosystem supported livelihoods of an estimated 32,000 workers across 5,000+ manufacturer partners. The company contributed INR 10 lakh to social welfare through the Green Helping Foundation Trust and launched a skills training program reaching 1,200 textile workers in Gujarat and Maharashtra.",
        ],
      },
    ]),
  },
  {
    id: "9",
    slug: "textile-technology-roundtable-delhi",
    title: "Delhi Roundtable: The Future of Textile Technology",
    category: "Event",
    tags: ["Technology", "Innovation", "Textile"],
    date: "2025-08-08",
    readTime: 3,
    image: "https://picsum.photos/seed/delhi-rt/1200/680",
    excerpt:
      "A closed-door roundtable with 40 industry leaders exploring how AI and automation are reshaping textile manufacturing and trade.",
    content: articleContent([
      {
        heading: "Event Summary",
        paragraphs: [
          "Arknine hosted a closed-door roundtable on August 8, 2025, at The Imperial, New Delhi, bringing together 40 senior executives from textile manufacturing, technology, and financial services to discuss the practical applications of artificial intelligence in textile trade.",
          "The three-hour session was structured around three themes: predictive demand forecasting, automated quality inspection, and dynamic pricing models for commodity textiles.",
        ],
      },
      {
        heading: "Key Takeaways",
        paragraphs: [
          "Participants agreed that while AI adoption in Indian textile manufacturing remains in early stages, the economic incentives are compelling. Companies that have implemented AI-driven demand forecasting reported a 23% average reduction in dead inventory, while automated visual inspection systems demonstrated accuracy rates exceeding 97% for common fabric defects.",
          "The roundtable concluded with consensus on the need for industry-wide data standards to enable interoperability between technology platforms serving the textile sector.",
        ],
      },
    ]),
  },
  {
    id: "11",
    slug: "arknine-annual-general-meeting-fy25",
    title: "Key Highlights from the FY25 Annual General Meeting",
    category: "PR",
    tags: ["Finance", "Growth"],
    date: "2025-07-10",
    readTime: 3,
    image: "https://picsum.photos/seed/agm-25/1200/680",
    excerpt:
      "A summary of resolutions passed, strategic updates shared, and shareholder questions addressed at Arknine's FY25 Annual General Meeting.",
    content: articleContent([
      {
        heading: "AGM Proceedings",
        paragraphs: [
          "Arknine Technologies held its Annual General Meeting for FY25 on July 10, 2025, at the company's registered office in Mumbai. A total of 847 shareholders participated, either in person or via electronic voting, representing 62% of the outstanding share capital.",
          "All five resolutions on the agenda were passed with requisite majorities, including the adoption of audited financial statements, re-appointment of statutory auditors, and approval of related party transactions.",
        ],
      },
      {
        heading: "Strategic Updates",
        paragraphs: [
          "The Board outlined the company's medium-term growth strategy centered on three pillars: deepening platform penetration in existing markets, expanding international operations with a focus on Southeast Asia, and scaling the trade finance vertical to capture a larger share of wallet from existing manufacturers.",
          "Shareholders were informed that the Board has authorized exploration of strategic acquisition opportunities in complementary technology and distribution businesses, with a focus on targets that would accelerate platform adoption or expand geographic reach.",
        ],
      },
    ]),
  },
  {
    id: "12",
    slug: "supply-chain-digitization-report",
    title: "The State of Digitization in Indian Textile Supply Chains",
    category: "Blog",
    tags: ["Supply Chain", "Technology", "Textile"],
    date: "2025-06-28",
    readTime: 8,
    image: "https://picsum.photos/seed/digitize-rpt/1200/680",
    excerpt:
      "Original research examining technology adoption patterns across 1,200 Indian textile manufacturers — and what it means for the industry's next decade.",
    content: articleContent([
      {
        heading: "Research Methodology",
        paragraphs: [
          "Between January and May 2025, Arknine's research team surveyed 1,247 textile manufacturers across 12 Indian states, covering enterprises ranging from INR 50 lakh to INR 500 crore in annual turnover. The survey examined technology adoption across five functional areas: procurement, inventory management, quality control, logistics, and financial management.",
          "This report presents the key findings, identifies adoption barriers, and proposes a maturity framework for assessing digital readiness in textile manufacturing operations.",
        ],
      },
      {
        heading: "Adoption Landscape",
        paragraphs: [
          "Only 23% of surveyed manufacturers use any form of digital procurement system, with adoption rates rising sharply with enterprise size. Among manufacturers with turnover above INR 50 crore, digital procurement adoption reaches 61%. However, even among digitally advanced manufacturers, integration between procurement, inventory, and financial systems remains rare — only 8% report having a fully integrated technology stack.",
          "The most commonly cited barriers to technology adoption are implementation cost (67%), lack of technically skilled workforce (54%), and uncertainty about return on investment (48%).",
        ],
      },
      {
        heading: "Implications and Opportunity",
        paragraphs: [
          "The findings suggest a significant market opportunity for integrated platforms that reduce implementation complexity and demonstrate clear economic returns. Manufacturers who have adopted digital procurement report an average 22% reduction in sourcing costs and 34% improvement in order fulfillment speed.",
          "Arknine is making this full research report available as a free download, reflecting our commitment to supporting industry-wide digitization and transparency.",
        ],
      },
    ]),
  },
  {
    id: "13",
    slug: "monotone-acquisition-complete",
    title: "Arknine Completes Acquisition of Monotone Brand",
    category: "PR",
    tags: ["Growth", "Partnerships"],
    date: "2025-06-12",
    readTime: 3,
    image: "https://picsum.photos/seed/monotone-acq/1200/680",
    excerpt:
      "The acquisition of Monotone strengthens Arknine's brand portfolio and expands its presence in the premium specialty textiles segment.",
    content: articleContent([
      {
        heading: "Transaction Summary",
        paragraphs: [
          "Arknine Technologies Limited announced the completion of its acquisition of Monotone, a premium specialty textiles brand, on June 12, 2025. The acquisition was structured as a 100% equity purchase with a combination of cash consideration and stock swap.",
          "Monotone brings a portfolio of 800+ premium textile SKUs, a loyal customer base of 180 retail partners, and proprietary fabric finishing technologies that complement Arknine's existing brand portfolio.",
        ],
      },
      {
        heading: "Strategic Rationale",
        paragraphs: [
          "The Monotone acquisition accelerates Arknine's vertical integration strategy by adding a premium brand with established market presence and differentiated product capabilities. The brand's strength in specialty and occasion-wear fabrics creates cross-selling opportunities across the Dukaan Dost platform's reach in core shirting and suiting categories.",
          "Integration is expected to deliver cost synergies of INR 4-6 crore annually through shared supply chain infrastructure and procurement efficiencies, with full integration targeted for completion by Q3 FY26.",
        ],
      },
    ]),
  },
  {
    id: "14",
    slug: "manufacturer-onboarding-best-practices",
    title: "How We Onboard 500 Manufacturers a Month — Systematically",
    category: "Blog",
    tags: ["Technology", "Growth", "Manufacturing"],
    date: "2025-05-30",
    readTime: 5,
    image: "https://picsum.photos/seed/onboard-mfg/1200/680",
    excerpt:
      "A behind-the-scenes look at the operational systems that enable Arknine to onboard and activate hundreds of manufacturers every month without compromising quality.",
    content: articleContent([
      {
        heading: "The Onboarding Challenge",
        paragraphs: [
          "Onboarding textile manufacturers is fundamentally different from onboarding software users. Each manufacturer has unique production capabilities, quality standards, pricing structures, and operational workflows. Scaling onboarding without losing this nuance requires systems that balance standardization with flexibility.",
          "When Arknine onboarded its first 100 manufacturers, the process took an average of 21 days per manufacturer and required extensive manual intervention. Today, the company onboards 500+ manufacturers monthly with an average activation time of 3 days.",
        ],
      },
      {
        heading: "The System",
        paragraphs: [
          "The onboarding workflow is organized into three parallel tracks that run simultaneously rather than sequentially. Track one handles documentation and compliance verification through automated document processing. Track two covers capability assessment through a structured questionnaire and optional factory inspection. Track three manages catalog setup through a guided product listing flow.",
          "Critical to scaling was the development of a tiered verification system that allows manufacturers to begin transacting at a basic level while more thorough verification processes complete in the background. This reduced the time-to-first-transaction from 21 days to under 72 hours.",
        ],
      },
      {
        heading: "Quality at Scale",
        paragraphs: [
          "Speed without quality control would undermine the platform's credibility. Arknine maintains a dedicated quality assurance team that conducts random sampling inspections on 15% of all new manufacturer listings. Manufacturers whose products fail quality checks enter a remediation workflow rather than being immediately removed, ensuring fair treatment while maintaining standards.",
        ],
      },
    ]),
  },
  {
    id: "15",
    slug: "textile-expo-guangzhou-2025",
    title: "Arknine at Canton Fair — Guangzhou 2025",
    category: "Event",
    tags: ["Textile", "Partnerships", "Growth"],
    date: "2025-05-15",
    readTime: 3,
    image: "https://picsum.photos/seed/canton-fair/1200/680",
    excerpt:
      "Arknine showcased its cross-border sourcing platform at the 137th Canton Fair, connecting Southeast Asian buyers with Indian textile manufacturers.",
    content: articleContent([
      {
        heading: "Presence at Canton Fair",
        paragraphs: [
          "Arknine Technologies exhibited at the 137th Canton Fair in Guangzhou, China, from May 15-19, 2025. The company's booth in the Textile & Garment Accessories section showcased the cross-border sourcing capabilities of the Dukaan Dost platform, with live demonstrations of the inventory discovery and trade finance features.",
          "Over the five-day event, the Arknine team engaged with over 340 qualified buyers from 28 countries, generating a pipeline of 86 potential partnership opportunities valued at approximately USD 8.4 million in annual procurement volume.",
        ],
      },
      {
        heading: "Cross-Border Focus",
        paragraphs: [
          "The Canton Fair provided a strategic platform for Arknine to demonstrate its cross-border transaction capabilities, including multi-currency settlement, international shipping coordination, and compliance documentation management. Several large buyers expressed interest in the platform's ability to consolidate orders across multiple Indian manufacturers into single shipments.",
        ],
      },
    ]),
  },
  {
    id: "16",
    slug: "building-textile-intelligence-data",
    title: "Textile Intelligence: How Platform Data Creates Market Insight",
    category: "Blog",
    tags: ["Technology", "Innovation", "Supply Chain"],
    date: "2025-04-22",
    readTime: 7,
    image: "https://picsum.photos/seed/tex-intel/1200/680",
    excerpt:
      "With millions of transactions flowing through the Arknine ecosystem, we're building proprietary market intelligence that benefits the entire textile value chain.",
    content: articleContent([
      {
        heading: "Data as Infrastructure",
        paragraphs: [
          "Every transaction on the Arknine platform generates data — prices, quantities, quality parameters, delivery timelines, seasonal patterns. Individually, these are operational records. Collectively, they form a real-time map of the Indian textile market that simply does not exist anywhere else.",
          "Arknine's Textile Intelligence initiative transforms this transactional data into actionable market insights for manufacturers, buyers, and industry stakeholders. The goal is not just to process transactions more efficiently, but to fundamentally improve decision-making across the textile value chain.",
        ],
      },
      {
        heading: "Current Capabilities",
        paragraphs: [
          "The Textile Intelligence engine currently powers three products: Price Benchmarking (real-time pricing data across 4,200 fabric categories), Demand Forecasting (regional demand predictions based on order pattern analysis), and Supplier Scoring (multi-dimensional manufacturer performance ratings).",
          "These tools are integrated directly into the Dukaan Dost platform, providing buyers with contextual market intelligence at the point of purchase decision. Early adoption data shows that buyers who use the Price Benchmarking tool achieve procurement savings averaging 7.3%.",
        ],
      },
      {
        heading: "Future Roadmap",
        paragraphs: [
          "We are developing predictive models for fabric price movements, seasonal trend identification, and supply disruption early-warning systems. The long-term vision is to make Arknine the definitive source of market intelligence for the global textile industry.",
        ],
      },
    ]),
  },
  {
    id: "17",
    slug: "corporate-governance-framework-update",
    title: "Strengthening Our Corporate Governance Framework",
    category: "PR",
    tags: ["ESG", "Finance"],
    date: "2025-04-05",
    readTime: 4,
    image: "https://picsum.photos/seed/gov-frame/1200/680",
    excerpt:
      "Arknine announces enhancements to its corporate governance structure, including new board committees and enhanced disclosure practices.",
    content: articleContent([
      {
        heading: "Governance Enhancements",
        paragraphs: [
          "Arknine Technologies announced a series of enhancements to its corporate governance framework, effective April 2025. These changes reflect the company's commitment to maintaining governance standards that exceed regulatory requirements and align with institutional investor expectations.",
          "Key changes include the establishment of a dedicated ESG Committee of the Board, enhanced related party transaction disclosure procedures, and the appointment of an independent compliance officer reporting directly to the Audit Committee.",
        ],
      },
      {
        heading: "Board Composition",
        paragraphs: [
          "The Board now comprises five directors, with three independent directors — representing 60% independent composition, above the statutory minimum. The newly formed ESG Committee is chaired by an independent director and will meet quarterly to review the company's environmental, social, and governance performance.",
          "Management believes these governance enhancements position Arknine well for potential future institutional investment and reflect the company's aspiration to be recognized as a governance leader among listed SMEs.",
        ],
      },
    ]),
  },
  {
    id: "18",
    slug: "warehouse-automation-case-study",
    title: "Warehouse Automation: Results from Our Pilot Program",
    category: "Blog",
    tags: ["Technology", "Supply Chain", "Manufacturing"],
    date: "2025-03-18",
    readTime: 6,
    image: "https://picsum.photos/seed/warehouse-auto/1200/680",
    excerpt:
      "A detailed case study on implementing warehouse automation in our Mumbai fulfillment center — what worked, what didn't, and the numbers.",
    content: articleContent([
      {
        heading: "Pilot Overview",
        paragraphs: [
          "In January 2025, Arknine initiated a warehouse automation pilot at its primary fulfillment center in Bhiwandi, Mumbai. The pilot covered three automation areas: barcode-driven inventory tracking, automated pick-path optimization, and semi-automated quality inspection using computer vision.",
          "The pilot ran for 12 weeks across a controlled section of the warehouse handling approximately 30% of daily throughput, allowing direct comparison with manual operations handling the remaining volume.",
        ],
      },
      {
        heading: "Results",
        paragraphs: [
          "Order picking accuracy improved from 94.2% to 99.1%, effectively eliminating the estimated INR 18 lakh annual cost of returns and re-shipments caused by picking errors. Average order processing time decreased from 34 minutes to 12 minutes per order.",
          "The computer vision quality inspection system achieved 96.8% accuracy in detecting common fabric defects (stains, weaving irregularities, color inconsistencies), compared to 91.4% for manual inspection. Importantly, the automated system maintained consistent accuracy throughout the shift, unlike human inspectors whose accuracy typically declined by 8-12% during the final two hours.",
        ],
      },
      {
        heading: "Investment and Payback",
        paragraphs: [
          "Total pilot investment was INR 1.2 crore, including hardware, software integration, and training. Based on pilot results, the company projects full automation of the Bhiwandi facility will cost INR 4.8 crore with an expected payback period of 14 months through labor cost optimization and error reduction.",
        ],
      },
    ]),
  },
  {
    id: "19",
    slug: "women-in-textile-technology-event",
    title: "Women in Textile Technology — Leadership Forum 2025",
    category: "Event",
    tags: ["ESG", "Innovation", "Textile"],
    date: "2025-03-08",
    readTime: 3,
    image: "https://picsum.photos/seed/women-textile/1200/680",
    excerpt:
      "Arknine sponsored the inaugural Women in Textile Technology Leadership Forum, bringing together 150 women leaders shaping the future of the industry.",
    content: articleContent([
      {
        heading: "Forum Highlights",
        paragraphs: [
          "On International Women's Day 2025, Arknine Technologies co-sponsored the inaugural Women in Textile Technology Leadership Forum at the ITC Maratha, Mumbai. The event brought together 150 women leaders from across the textile and technology sectors for a day of discussions, workshops, and networking.",
          "The forum featured keynote addresses on navigating leadership in traditionally male-dominated industries, followed by breakout sessions on specific topics including supply chain management, fintech innovation, and sustainable manufacturing.",
        ],
      },
      {
        heading: "Arknine's Commitment",
        paragraphs: [
          "Arknine announced a scholarship program in partnership with NIFT (National Institute of Fashion Technology) to support 20 women students annually pursuing specializations in textile technology and supply chain management. The program will cover tuition fees and provide mentorship from Arknine's leadership team.",
          "As of March 2025, women represent 34% of Arknine's total workforce, including 28% of management positions. The company has set a target of 40% women in management roles by FY27.",
        ],
      },
    ]),
  },
  {
    id: "20",
    slug: "indonesia-market-entry-announcement",
    title: "Arknine Announces Entry into Indonesian Textile Market",
    category: "PR",
    tags: ["Growth", "Partnerships", "Supply Chain"],
    date: "2025-02-14",
    readTime: 4,
    image: "https://picsum.photos/seed/indo-entry/1200/680",
    excerpt:
      "Indonesia, the world's fourth-most-populous nation and a major textile producer, becomes Arknine's fourth international market.",
    content: articleContent([
      {
        heading: "Market Entry Strategy",
        paragraphs: [
          "Arknine Technologies announced its entry into the Indonesian textile market through a strategic partnership with PT Textile Solutions Indonesia, a Jakarta-based textile distribution company with relationships spanning 600 manufacturers across Java and Bali.",
          "Indonesia represents a USD 38 billion textile and garment market, yet technology adoption among manufacturers remains significantly below levels seen in neighboring Vietnam and China. Arknine sees this adoption gap as a significant opportunity to introduce its integrated platform model.",
        ],
      },
      {
        heading: "Partnership Structure",
        paragraphs: [
          "The partnership leverages PT Textile Solutions' local market knowledge, manufacturer relationships, and regulatory expertise, combined with Arknine's technology platform, trade finance capabilities, and international buyer network. Operations are expected to commence in Q2 FY26, with an initial target of onboarding 200 manufacturers within the first 12 months.",
          "The Indonesian expansion follows Arknine's established playbook of partnering with local operators to accelerate market entry while minimizing capital risk. The company has allocated INR 8 crore for first-year Indonesia operations.",
        ],
      },
      {
        heading: "Broader International Strategy",
        paragraphs: [
          "With the addition of Indonesia, Arknine now has operational presence in four countries (India, China, Vietnam, Indonesia), covering markets that collectively represent over 60% of global textile production. The company's international revenue currently accounts for 18% of consolidated revenue, with a medium-term target of 30%.",
        ],
      },
    ]),
  },
];

/* ------------------------------------------------------------------ */
/*  Utility helpers                                                     */
/* ------------------------------------------------------------------ */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(post: BlogPost, count = 3): BlogPost[] {
  return blogPosts
    .filter((p) => p.id !== post.id)
    .sort((a, b) => {
      const aScore = a.tags.filter((t) => post.tags.includes(t)).length;
      const bScore = b.tags.filter((t) => post.tags.includes(t)).length;
      return bScore - aScore;
    })
    .slice(0, count);
}

export function getFeaturedPost(
  posts: BlogPost[]
): BlogPost | undefined {
  return posts.find((p) => p.featured) || posts[0];
}
