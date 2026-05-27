6th Jun '24, 06:51am

Status: #Completed #Small

Tags: [[4 - Tags/Containers|Containers]] [[Virtualization]]

# Kubernetes

Kubernetes architecture consists of running clusters that allow containers to run across multiple machines and environments. Each cluster typically consists of ==_worker nodes_==, which ==run the containerized applications==, and ==_control plan nodes_==, which ==control the cluster.== The control plane acts as the orchestrator of the Kubernetes cluster. It includes several components: the [API](https://www.ibm.com/topics/api#:) server (manages all interactions with Kubernetes), the control manager (handles all control processes), the cloud controller manager (the interface with the cloud provider’s API), and so forth. ==Worker nodes run containers using container== ==runtimes like Docker==. ==Pods, the smallest deployable units in a cluster==, hold one or more app containers and share resources, such as storage and networking information.

Kubernetes ==enables developers and operators to declare the desired state of their overall container environment through YAML files==. Then, ==Kubernetes does all the processing work== of establishing and maintaining that state, with activities that include deploying a specified number of instances of a given application or workload, rebooting that application if it fails, load balancing, autoscaling, zero downtime deployments and more. Container orchestration with Kubernetes is also crucial to [continuous integration and continuous delivery (CI/CD)](https://www.ibm.com/blog/ci-cd-pipeline/) or the [DevOps](https://www.ibm.com/topics/devops) pipeline—which would be ==impossible without automation==.

In 2015, Google donated Kubernetes to the [Cloud Native Computing Foundation (CNCF)](https://www.cncf.io/), the open-source, vendor-neutral hub of cloud-native computing operated under the auspices of the Linux Foundation. Since then, Kubernetes has become the most widely used ==container orchestration tool== for running container-based workloads worldwide. In a [CNCF report](https://www.cncf.io/reports/kubernetes-project-journey-report/), Kubernetes is the ==second largest== [open-source](https://www.ibm.com/topics/open-source) project in the world (after Linux) and the primary container orchestration tool for 71% of Fortune 100 companies.

Watch this amazing video that summaries's kubernetes: https://www.youtube.com/watch?v=PziYflu8cB8

# References
https://www.ibm.com/topics/containers