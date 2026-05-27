4th Jun '24, 08:34am

Status: #Completed 

Tags: [[Linux]] [[OS]] [[Virtualization]]

# Virtual Machines

Virtual Machines are ==virtual computers==, they ==mimic== (depending on what u think) a ==machine== ==running with those resources==. It works by ==dedicating some resources== to a virtual machine but, one doesn't affect the other in whatsoever way. Each Virtual Machine is ==separate== ==from the other.==

Virtualization is the process of ==transforming== certain entities, usually ==hardware, into software==. Virtualization ==works by using a layer of software==, called a ==hypervisor or virtual machine monitor (VMM)==, that sits between the physical hardware and the VM. The ==hypervisor== ==manages the allocation of computing resources==, such as CPU, memory, and storage, to each VM. This ==allows multiple VMs== to run on a single physical machine, each ==with its own OS== and
applications.

## Properties of Virtual Machine

- ==Takes hardware resources from the host OS==
- Creates virtual CPU, virtual RAM, virtual storage for each virtual machine
- ==Hardware resources are shared==
- Virtual machines are complemented isolated, they don't know about their surroundings
	at all. That is they're operation's don't affect the other and the host machines.

## Hypervisor

There are two types of Hypervisors, type 1 and type 2. Type 1 hypervisor is also called native or bare metal hypervisor since it directly interacts with the hardware and not through an OS which is the case in type 2 which is also called hosted hypervisors.

Type 2 hypervisors are mostly used in personal computers due to fact alone that they virtual machines are guests on a Host OS.
Type 1 hypervisors are used on servers, by computers.

## Why are Companies adopting Virtualization

Why is abstraction of the operating system from the hardware a big deal?

If an OS is downloaded without virtualization, then the OS is tightly coupled to the hardware. So that results in a single point of failure, if any physical component of the physical computer stops working (and it cannot be replaced or fixed) then that OS, End Applications and all the data would be gone.  

With virtualization however, the OS is a portable file, these files are VM images. This image while having everything-even the data in the OS-in that file. This helps in security, portability, and its independent from any physical server.

# Also Refer To

[[2 - Full Notes/Containers]]

# References
https://www.youtube.com/watch?v=mQP0wqNT_DI