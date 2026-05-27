20th Jan '25, 20:18pm

Status: #InProgress #ProperNotes 

Tags: [[Boot Up]] [[OS]] [[File System]]

# EFI

### Introduction

The EFI (Extensible Firmware Interface) or UEFI (Unified Extensible Firmware Interface) boot process is a modern replacement for the legacy BIOS boot process. It is designed to initialize hardware components, locate the operating system, and hand over control to it efficiently and securely.

Look under [[BIOS]] for more information about BIOS.

### ESP

The ESP or (Extensible Firmware Interface system partition) is a system partition. When a computer is booted, UEFI firmware loads files stored on the ESP to start operating systems and various utilities.

An ESP contains the boot loaders, boot managers, or kernel images of installed operating systems (which are typically contained in other partitions), device driver files for hardware devices present in a computer and used by the firmware at boot time, system utility programs that are intended to be run before an operating system is booted, and data files such as error logs.

**DOUBT**: for each OS is there a separate ESP? no, all the images are loaded onto one ESP and that image decides where to go and launch the OS. But stuff is still unclear, like does GRUB launch and then it knows where which image is there? Also what is the file system like? according to chatgpt the images should be on the ESP, but for windows there isn't I feel its because I manually got it into memory and if im not wrong I have two ESP partitions, one for windows only and the other for GRUB + linux.

## Sequence of Operations that take place

### **1. Pre-Boot Phase**

This phase involves initializing the firmware and hardware required to start the system.

#### **a. Power-On Self-Test (POST)**

- POST initializes and tests hardware components like CPU, RAM, and storage.
- If hardware issues are detected, the system halts and may display error codes or beeps.

#### **b. Platform Initialization**

- UEFI firmware initializes the platform in phases:
    - **SEC (Security Phase)**: Verifies the integrity of the UEFI firmware itself.
    - **PEI (Pre-EFI Initialization)**: Sets up the CPU, memory, and low-level hardware.
    - **DXE (Driver Execution Environment)**: Loads UEFI drivers for hardware like GPUs, disks, and network interfaces.

### **2. UEFI Boot Manager**

Once the hardware and firmware are initialized, the UEFI Boot Manager takes over to locate and execute the bootloader.

#### a. - **Checking the Partition Table:**
- UEFI does **not** use the traditional MBR boot sector method.
- Instead, it directly reads the partition table from the storage device to determine whether it follows the **GPT** or **MBR** scheme.
- The key difference:
	- **GPT** has a Protective MBR (first sector) and a GUID Partition Table structure.
    - **MBR** has a traditional partition table in the first sector (sector 0).
- **Deciding the Boot Mode:**
    - If UEFI finds a **GPT disk**, it expects an **EFI System Partition (ESP)** containing a bootloader (`.efi` file).
    - If it detects an **MBR disk**, it assumes the system must boot in **Legacy (BIOS) mode**, since MBR uses a boot sector and chain-loading process.

#### **b. Locating the Boot Configuration**

- The UEFI firmware checks the **EFI System Partition (ESP)** on the boot disk.
    - ESP is a special partition formatted with a FAT32 filesystem.
    - It contains UEFI applications like bootloaders, firmware utilities, and drivers.
    - Common directory paths in the ESP:
        - `/EFI/Boot/Bootx64.efi` (default bootloader for 64-bit systems).
        - `/EFI/<vendor>/grubx64.efi`, `/EFI/Microsoft/Boot/bootmgfw.efi`, etc.

#### **c. Boot Order**

- The firmware uses the boot order defined in **NVRAM** (non-volatile memory) to determine which UEFI application to run first.
    - Example boot entries might include GRUB, Windows Boot Manager, or Linux kernel bootloaders.
    - You can view and modify these entries using `efibootmgr` in Linux or UEFI setup tools.

#### **d. Executing the Bootloader**

- The UEFI Boot Manager launches the specified bootloader or application (`.efi` file) from the ESP.

### **3. Bootloader Execution**

The bootloader is responsible for loading the operating system kernel.

#### **a. GRUB (or Other Bootloaders)**

- If the bootloader is GRUB, it presents a menu to select an OS or kernel.
- It reads the kernel and initramfs (initial RAM filesystem) into memory.

#### **b. Kernel Execution**

- The bootloader passes control to the OS kernel, along with boot parameters like the root filesystem location.
- UEFI systems may directly load the kernel in some Linux distributions (e.g., systemd-boot).

### **4. Operating System Initialization**

Once the kernel is loaded, the operating system begins its startup process.

#### **a. Kernel Initialization**

- The kernel initializes drivers, mounts the root filesystem, and starts system processes.
- On Linux, the `init` or `systemd` process takes over to manage the system.

#### **b. Hand-Off to User Environment**

- The operating system fully boots and hands control to the user environment (desktop, command line, etc.).

### **Detailed Features of the EFI Boot Process**

#### **EFI System Partition (ESP)**

- A small, FAT32-formatted partition.
- Typically 100-500 MB in size.
- Contains UEFI applications and bootloaders.
- Allows multi-boot configurations (e.g., Windows and Linux) by placing their `.efi` files on the ESP.

#### **Secure Boot**

- Verifies the digital signature of the bootloader to prevent unauthorized code execution (e.g., rootkits).
- UEFI checks signatures against a database of trusted certificates in firmware.

#### **NVRAM (Non-Volatile RAM)**

- Stores boot entries, variables, and settings for the firmware.
- Boot entries are configurable using tools like `efibootmgr` in Linux.

#### **UEFI Shell**

- A command-line interface provided by UEFI firmware.
- Allows you to troubleshoot, manage files, or execute UEFI applications manually.

---

### **Comparison to Legacy BIOS**

| Feature             | Legacy BIOS                        | UEFI                             |
| ------------------- | ---------------------------------- | -------------------------------- |
| Boot Mode           | MBR (Master Boot Record)           | GPT (GUID Partition Table)       |
| Storage Limit       | 2 TB                               | 9.4 Zettabytes                   |
| Bootloader Location | Fixed disk sectors                 | EFI System Partition (ESP)       |
| Secure Boot         | Not supported                      | Supported                        |
| Driver Support      | Embedded in BIOS                   | Modular, supports drivers on ESP |
| Boot Performance    | Sequential hardware initialization | Parallel hardware initialization |

---

### **UEFI Boot Example**

Here’s a common UEFI boot process for a dual-boot Linux and Windows setup:

1. **Power On**: POST initializes the hardware.
2. **UEFI Boot Manager**: Checks boot order in NVRAM and launches the bootloader (e.g., GRUB or Windows Boot Manager).
3. **GRUB**:
    - Displays a menu to choose between Linux or Windows.
    - Loads the kernel and passes control to it.
4. **Kernel**:
    - Initializes devices and mounts the root filesystem.
    - Starts system services (`systemd`, `init`).
5. **User Environment**:
    - The desktop environment (GNOME, KDE) or CLI shell loads.

# References
Chatgpt
Google