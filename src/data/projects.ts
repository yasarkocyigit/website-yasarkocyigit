export type Project = {
    title: string
    description: string
    tags: string[]
    link: string
    github?: string
    status: 'Active' | 'Archived' | 'Building' | 'Completed'
    highlight?: boolean
    year?: string
}

export const projects: Project[] = [
    {
        title: "Lakeflow Pipelines",
        description: "Moving from Airflow to Databricks Lakeflow. Implementing Spark Declarative Pipelines (SDP) for 10TB+ streaming data.",
        tags: ["Lakeflow", "Databricks", "Streaming", "Quality"],
        link: "/case-studies/databricks-dlt-pipeline",
        status: "Active",
        highlight: true,
        year: "2024"
    },
    {
        title: "Unity Catalog Migration",
        description: "Executing a 1PB+ data migration from Hive Metastore to Unity Catalog. Deep dive into SYNC, Federation, and Security.",
        tags: ["Governance", "Security", "Migration", "Databricks"],
        link: "/case-studies/unity-catalog-migration",
        status: "Completed",
        highlight: true,
        year: "2025"
    },
    {
        title: "Metadata Driven Framework",
        description: "Orchestrating 500+ tables via ADF & Databricks using a single dynamic pipeline. Features Unity Catalog governance and Control Table logic.",
        tags: ["Azure Data Factory", "Databricks", "Architecture"],
        link: "/case-studies/metadata-driven-adf",
        status: "Active",
        highlight: true,
        year: "2024"
    },
    {
        title: "Enterprise Data Platform",
        description: "A centralized data lakehouse on AWS processing 2TB+ daily. Built with Terraform, Spark, and Iceberg.",
        tags: ["Data Engineering", "AWS", "Spark", "Terraform"],
        link: "/data-engineering",
        status: "Active",
        highlight: true,
        year: "2024"
    },

    {
        title: "The Pipeline Guardian",
        description: "Self-healing data pipeline agent hosted on Databricks Apps. Automates RCA and recovery for production failures.",
        tags: ["AI Agent", "Databricks Apps", "Automation"],
        link: "/case-studies/databricks-agentic-app",
        status: "Active",
        highlight: true,
        year: "2025"
    },

    {
        title: "ADF to Fabric Migration",
        description: "Automated migration of Azure Data Factory pipelines to Fabric Data Factory using PowerShell.",
        tags: ["Fabric", "Data Factory", "Migration", "PowerShell"],
        link: "/case-studies/adf-to-fabric-migration",
        status: "Completed",
        highlight: true,
        year: "2025"
    },
    {
        title: "Serverless to Fabric Migration",
        description: "Migrating from Synapse Serverless SQL to Microsoft Fabric Lakehouse. Automating Delta shortcuts via PySpark.",
        tags: ["Fabric", "Migration", "Lakehouse", "PySpark"],
        link: "/case-studies/serverless-to-fabric-migration",
        status: "Completed",
        highlight: true,
        year: "2025"
    },
]
