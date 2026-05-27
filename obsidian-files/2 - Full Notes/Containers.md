6th Jun '24, 06:11am

Status: #Completed #ProperNotes 

Tags: [[Linux]] [[OS]] [[Containers]]

# Containers

Containers are ==similar to VMs== but the major ==difference lies== in the fact that ==VMs simulate an entire machine, but a container only simulates an application==. It contains everything that requires that the application requires for it to run. So it ==can run== on about just ==any computer== environment without having to add anything to that computer.

The ==leading software== that is used to create, manage and run these containers is ==[Docker](https://www.docker.com/)==.

==Containers use== a ==container engine== that unpacks and hands the container over to the OS. Containers have smaller files, making them ==ultra fast, ultra portable and lightweight==. They take ==less time to boot up, and consume less power==.

Containers must be ==packaged== to work with the ==same operating system== of the server.

# Docker

Docker is an ==open-source== [containerization software](https://search.brave.com/search?q=containerization+software&source=desktop&summary=1&summary_og=7a75dbf97028cad65407ed) platform that functions as a [platform as a service (PaaS)](https://www.ibm.com/topics/paas), Docker enables developers to build, deploy, run, update and manage containers.

Docker uses the Linux kernel (the operating system’s base component) and kernel features (like Cgroups and namespaces) to separate processes so they can run independently. Docker essentially takes an application and its dependencies and turns them into a virtual container that can run on any Windows, macOS or Linux-running computer system.

Docker is based on a ==client-server architecture==, with ==Docker Engine serving as the underlying technology==. Docker provides an image-based deployment model, making sharing apps simple across computing environments.

# Container orchestration

==Operating hundreds of thousands of containers== across a system ==can become unmanageable== and calls for an orchestration management solution. 

That’s where [container orchestration](https://www.ibm.com/topics/container-orchestration) comes in, allowing companies ==to manage large volumes throughout their lifestyle, providing==:

- Provisioning
- Redundancy
- Health monitoring
- Resource allocation
- Scaling and [load balancing](https://www.ibm.com/topics/load-balancing)
- Moving between physical hosts

While other container orchestration platforms (for example, Apache Mesos, Nomad, [Docker Swarm](https://www.ibm.com/blog/docker-swarm-vs-kubernetes-a-comparison/)) exist, [Kubernetes](https://www.ibm.com/topics/kubernetes) has become the industry standard.

Read More about: [[Kubernetes]]

Also refer to: https://www.ibm.com/topics/containers (a lot of good information)

# Extras

To clarify any confusion, the Docker container platform namesake also refers to [Docker, Inc.](https://www.docker.com/company), which develops productivity tools built around its open-source containerization platform and the Docker open source ecosystem and [community](https://www.docker.com/community/open-source/).

In 2015, Docker and other leaders in the container industry established [The Open Container Initiative](https://opencontainers.org/), part of the Linux Foundation, an open governance structure for the express purpose of creating open industry standards around container formats and runtime environments.

# References
https://www.youtube.com/watch?v=eyNBf1sqdBQ
https://www.ibm.com/topics/containers
https://cloud.google.com/learn/what-are-containers