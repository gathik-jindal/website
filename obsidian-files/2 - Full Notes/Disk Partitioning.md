3rd Jul '24, 11:58am

Status: #InProgress #ProperNotes 

Tags: [[BIOS]] [[Configuring BIOS or CMOS]] [[OS]] [[Boot Up]] [[File System]]

# Disk Partitioning

**Disk partitioning** or **disk slicing** is the creation of one or more regions on secondary storage, so that each region can be managed separately. These regions are called partitions. It is typically the first step of preparing a newly installed disk after a partitioning scheme is chosen for the new disk before any file system is created.

The disk stores the information about the partitions' locations and sizes in an area known as the partition table that the operating system reads before any other part of the disk. Each partition then appears to the operating system as a distinct "logical" disk that uses part of the actual disk.

Partitioning allows the use of different filesystems to be installed for different kinds of files. Separating user data from system data can prevent the system partition from becoming full and rendering the system unusable. Partitioning can also make backing up easier. A disadvantage is that it can be difficult to properly size partitions, resulting in having one partition with too much free space and another nearly totally allocated.

# From Class

A disk contains a sequence of bytes segregated into sectors and blocks.

>[!note]
>Sector: Smallest addressable unit of memory addressable by the I/O device
>Block: Smallest unit or data that a file system manages, its mostly in multiples of sector sizes.


The first few sectors contains the MBR which helps the file system know the different partitions in the hard drive. It also contains a mapping to let the computer know where to start the boot process from. Read [[EFI]]

| Feature             | Legacy BIOS                        | UEFI                             |
| ------------------- | ---------------------------------- | -------------------------------- |
| Boot Mode           | MBR (Master Boot Record)           | GPT (GUID Partition Table)       |
| Storage Limit       | 2 TB                               | 9.4 Zettabytes                   |
| Bootloader Location | Fixed disk sectors                 | EFI System Partition (ESP)       |
| Secure Boot         | Not supported                      | Supported                        |
| Driver Support      | Embedded in BIOS                   | Modular, supports drivers on ESP |
| Boot Performance    | Sequential hardware initialization | Parallel hardware initialization |

## MBR

A **master boot record** (**MBR**) is a type of boot sector in the first block of partitioned computer mass storage devices like fixed disks or removable drives intended for use with IBM PC-compatible "IBM PC-compatible") systems and beyond. The concept of MBRs was publicly introduced in 1983 with PC DOS 2.0.

The MBR holds the information on how the disc's sectors (A.K.A. "blocks") are divided into partitions, each partition notionally containing a file system. The MBR also contains executable code to function as a loader for the installed operating system—usually by passing control over to the loader's second stage, or in conjunction with each partition's volume boot record (VBR). This MBR code is usually referred to as a boot loader.

The organization of the partition table in the MBR limits the maximum addressable storage space of a partitioned disk to 2 TiB (232 × 512 bytes). Approaches to slightly raise this limit utilizing 32-bit arithmetic or 4096-byte sectors are not officially supported, as they fatally break compatibility with existing boot loaders, most MBR-compliant operating systems and associated system tools, and may cause serious data corruption when used outside of narrowly controlled system environments. Therefore, the MBR-based partitioning scheme is in the process of being superseded by the GUID Partition Table (GPT) scheme in new computers. A GPT can coexist with an MBR in order to provide some limited form of backward compatibility for older systems.

MBRs are not present on non-partitioned media such as floppies, superfloppies or other storage devices configured to behave as such, nor are they necessarily present on drives used in non-PC platforms.

GUID is used these days, to understand how to boot up process realizes this look at [[EFI]].

## Creating and mounting partitions

We can create partitions from one disk that essentially makes the computer think of them as different I/O devices. We then use the `mkfs` command to create the file systems for the partitions. Then we mount them using the `mount` command. We can mount the different partitions to any location (in the file hierarchy) we want. In windows this is by default in the `This PC` directory, in linux we can mount it anywhere we like.

# References
https://wiki.osdev.org/MBR_(x86)