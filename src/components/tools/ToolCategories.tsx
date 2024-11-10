import { 
  GitBranch, Shield, Cloud, Terminal, Activity, 
  Container, Network, Lock, Database, Server,
  Archive, Scale, Settings, Eye, MessageSquare
} from 'lucide-react';

export const toolCategories = [
  {
    title: "Cloud Platform",
    description: "Multi-region cloud infrastructure with automated scaling and hybrid deployment support.",
    icon: Cloud,
    items: ["AWS", "Azure", "GCP", "Hybrid Cloud"]
  },
  {
    title: "GitOps & CD",
    description: "Automated delivery pipeline with declarative configs and instant rollback capabilities.",
    icon: GitBranch,
    items: [
      "FluxCD",
      "ArgoCD",
      "Tekton",
      "Weave GitOps"
    ]
  },
  {
    title: "Containers",
    description: "Production-grade container orchestration with auto-healing and advanced scheduling.",
    icon: Container,
    items: ["Kubernetes", "Containerd", "CRI", "Rancher", "Docker", "Docker Compose"]
  },
  {
    title: "Security",
    description: "Zero-trust framework with encrypted secrets and automated policy enforcement.",
    icon: Shield,
    items: ["External Secrets", "Sealed Secrets", "SOPS", "KubeArmor", "Kyverno", "Falco"]
  },
  {
    title: "Databases",
    description: "High-availability databases with automated backups and instant failover support.",
    icon: Database,
    items: ["PostgreSQL", "MongoDB", "CloudNative PG", "MariaDB", "StackGres", "TimescaleDB", "Percona"]
  },
  {
    title: "In-Memory Data",
    description: "Low-latency distributed caching with intelligent partitioning and replication.",
    icon: Activity,
    items: ["Redis", "Memcached", "Dragonfly", "ElastiCache", "InfluxDB", "Hazelcast"]
  },
  {
    title: "Event Streaming",
    description: "Fault-tolerant event streaming with guaranteed delivery and real-time processing.",
    icon: MessageSquare,
    items: ["Apache Kafka", "RabbitMQ", "AWS MSK", "Debezium", "Kafka Connect", "Mirror Maker"]
  },
  {
    title: "Observability",
    description: "Full-stack monitoring with real-time metrics and intelligent alert management.",
    icon: Eye,
    items: ["Prometheus", "Grafana", "Datadog", "ELK Stack", "Loki", "Jaeger"]
  },
  {
    title: "Networking",
    description: "Advanced service mesh with traffic management and blue-green deployment support.",
    icon: Network,
    items: ["Linkerd", "Istio", "Kong", "Cilium", "Envoy", "Traefik"]
  },
  {
    title: "Infrastructure",
    description: "Infrastructure as code with drift detection and automated state management.",
    icon: Settings,
    items: ["Terraform", "Crossplane", "AWS CDK", "Ansible", "Pulumi", "CloudFormation"]
  },
  {
    title: "Registries",
    description: "Secure artifact management with vulnerability scanning and access control.",
    icon: Archive,
    items: ["Harbor", "Nexus", "Artifactory", "ECR", "ACR", "GCR"]
  },
  {
    title: "Autoscaling",
    description: "Intelligent resource optimization with predictive scaling and cost management.",
    icon: Scale,
    items: ["Karpenter", "Cluster Autoscaler", "KEDA", "VPA", "HPA", "CAST AI"]
  }
] as const;