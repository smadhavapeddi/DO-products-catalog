// DigitalOcean product catalog, grouped as at docs.digitalocean.com/products/
// (last checked September 2026). Kept as static content — this is real
// product data, not AI-generated — the AI panels below the grid are separate.

export const PRODUCTS = [
  {
    category: "AI-Native Cloud",
    blurb: "Build, train, and deploy AI agents and models.",
    icon: "🧠",
    items: [
      { name: "Inference", desc: "Serverless, dedicated, and batch inference across 70+ foundation models." },
      { name: "GPU Droplets", desc: "On-demand GPU-backed VMs for training and inference workloads." },
      { name: "1-Click Models", desc: "Pre-configured open-source model deployments from the Marketplace." },
      { name: "Bare Metal GPUs", desc: "Dedicated, non-virtualized GPU hardware for maximum performance." },
      { name: "Paperspace", desc: "ML development notebooks, workflows, and deployments." },
    ],
  },
  {
    category: "Compute",
    blurb: "VMs, managed containers, PaaS, and serverless functions.",
    icon: "🖥️",
    items: [
      { name: "Droplets", desc: "Linux-based virtual machines that spin up in under a minute." },
      { name: "App Platform", desc: "PaaS that builds and deploys straight from a GitHub/GitLab repo." },
      { name: "Kubernetes", desc: "Managed K8s clusters without control-plane overhead." },
      { name: "Functions", desc: "Serverless functions billed only for execution time." },
      { name: "Cloudways", desc: "Managed hosting platform for web applications." },
    ],
  },
  {
    category: "Data Services",
    blurb: "Databases, vector search, and RAG building blocks.",
    icon: "🗄️",
    items: [
      { name: "Managed Databases", desc: "PostgreSQL, MySQL, Kafka, MongoDB, OpenSearch, and Valkey clusters." },
      { name: "Vector Databases", desc: "Weaviate, OpenSearch, or PostgreSQL for similarity search." },
      { name: "Knowledge Bases", desc: "RAG-ready retrieval over your own content." },
    ],
  },
  {
    category: "Storage",
    blurb: "Object, block, and file storage for any workload.",
    icon: "💾",
    items: [
      { name: "Spaces Object Storage", desc: "S3-compatible object storage with a built-in CDN." },
      { name: "Volumes Block Storage", desc: "Network-attached SSD block storage for Droplets." },
      { name: "Network File Storage", desc: "NFS-based shared file storage across resources." },
    ],
  },
  {
    category: "Containers & Images",
    blurb: "Backups, images, and container tooling.",
    icon: "📦",
    items: [
      { name: "Container Registry", desc: "Private Docker image registry integrated with the platform." },
      { name: "Marketplace", desc: "Preconfigured 1-click app images." },
      { name: "Custom Images", desc: "Upload and boot your own OS images." },
      { name: "Snapshots", desc: "Point-in-time images of Droplets or Volumes." },
      { name: "Backups", desc: "Automated, scheduled Droplet backups." },
      { name: "SnapShooter", desc: "Cross-platform backup automation and monitoring." },
    ],
  },
  {
    category: "Networking",
    blurb: "Secure and route traffic to your applications.",
    icon: "🌐",
    items: [
      { name: "VPC", desc: "Private, isolated networking between your resources." },
      { name: "Load Balancers", desc: "Distribute traffic across multiple Droplets or Kubernetes nodes." },
      { name: "Cloud Firewalls", desc: "Stateful, network-level traffic filtering." },
      { name: "Domains and DNS", desc: "Manage DNS records for your domains." },
      { name: "Reserved IPs", desc: "Static IPs you can remap between resources." },
      { name: "IPv6", desc: "Native IPv6 support across compute products." },
      { name: "DDoS Protection", desc: "Built-in mitigation against distributed denial-of-service attacks." },
    ],
  },
  {
    category: "Management",
    blurb: "Observe, secure, and organize your infrastructure.",
    icon: "🛠️",
    items: [
      { name: "Monitoring", desc: "Metrics, alerts, and dashboards for your resources." },
      { name: "CSPM", desc: "Cloud security posture management and misconfiguration detection." },
      { name: "Uptime", desc: "External endpoint checks and downtime alerting." },
      { name: "Projects", desc: "Group and organize resources by application or team." },
    ],
  },
];
