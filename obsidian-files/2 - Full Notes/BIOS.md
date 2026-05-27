2nd Jul '24, 12:10pm

Status: #Completed  #ProperNotes 

Tags: [[OS]] [[Boot Up]]

# Introduction

BIOS, short for Basic Input/Output System, is a type of firmware that plays a crucial role in the startup process of a computer. It is a software program stored on a small memory chip in the system’s motherboard.

BIOS is a program that is made accessible to the microprocessor on an erasable programmable read-only memory (EPROM) chip. When users turn on their computer, the microprocessor passes control to the BIOS program, which is always located at the same place on EPROM.

Today, UEFI (Unified Extensible Firmware Interface) has largely replaced BIOS as the preferred boot mechanism.

# Some Operations that the BIOS performs

- A power-on self-test (POST) for all of the different hardware components in the system to make sure everything is working properly
- Activating other BIOS chips on different cards installed in the computer - For example, SCSI (Small Computer System Interface) and graphics cards often have their own BIOS chips.
- Providing a set of low-level routines that the operating system uses to interface to different hardware devices - It is these routines that give the BIOS its name. They manage things like the keyboard, the screen, and the serial and parallel ports, especially when the computer is booting.
- Managing a collection of settings for the hard disks, clock, etc.

# Sequence of Operations that take place

## Overview

**When you turn on your computer, the BIOS does several things. This is its usual sequence:**

1. Check the [[#CMOS]] Setup for custom settings
2. Load the interrupt handlers and device drivers
3. Initialize registers and power management
4. Perform the power-on self-test (POST)
5. Display system settings
6. Determine which devices are bootable
7. Initiate the bootstrap sequence

## Step 1 & 2

The first thing the BIOS does is check the information stored in a tiny (64 bytes) amount of RAM located on a **complementary metal oxide semiconductor** (CMOS) chip. The CMOS Setup provides detailed information particular to your system and can be altered as your system changes. The BIOS uses this information to modify or supplement its default programming as needed. We will talk more about these settings later.

## Step 3

After checking the CMOS Setup and loading the [[#Interrupt Handlers]], the BIOS determines whether the video card is operational. Most video cards have a miniature BIOS of their own that initializes the memory and graphics processor on the card. If they do not, there is usually video driver information on another ROM on the motherboard that the BIOS can load.

## Step 4

Next, the BIOS checks to see if this is a **cold boot** or a **reboot**. It does this by checking the value at [[#BDA|memory address 0000:0472]]. A value of 1234h indicates a reboot, and the BIOS skips the rest of POST. Anything else is considered a cold boot.

If it is a cold boot, the BIOS verifies RAM by performing a read/write test of each memory address. It checks the PS/2 ports or USB ports for a keyboard and a mouse. It looks for a **peripheral component interconnect** (PCI) bus and, if it finds one, checks all the PCI cards. If the BIOS finds any errors during the POST, it will notify you by a series of beeps or a text message displayed on the screen. An error at this point is almost always a hardware problem.

## Step 5

The BIOS then displays some details about your system. This typically includes information about:

- The processor
- The floppy drive and hard drive
- Memory
- BIOS revision and date
- Display

## Step 6 & 7

Any special drivers, such as the ones for **small computer system interface** (SCSI) adapters, are loaded from the adapter, and the BIOS displays the information. The BIOS then looks at the sequence of storage devices identified as **boot** devices in the CMOS Setup. "Boot" is short for "bootstrap," as in the old phrase, "Lift yourself up by your bootstraps." Boot refers to the process of launching the operating system. The BIOS will try to initiate the boot sequence from the first device. If the BIOS does not find a device, it will try the next device in the list. If it does not find the proper files on a device, the startup process will halt. If you have ever left a disk  when you restarted your computer, you have probably seen this message.

The BIOS has tried to boot the computer off of the disk left in the drive. Since it did not find the correct system files, it could not continue. Of course, this is an easy fix. Simply pop out the disk and press a key to continue.

# Additional or Related Notes

- [[EFI]]
- [[Configuring BIOS or CMOS]]
- [[Disk Partitioning]]
- [[File System]]

# Terms & Terminology

## CMOS

CMOS is also a computer chip on the motherboard, or more specifically a RAM chip, which means it would normally lose the settings it's storing when the computer is shut down (just like how the contents of RAM aren't maintained each time you restart your computer). However, the CMOS battery is used to provide constant power to the chip.

When the computer first boots up, BIOS pulls information from the CMOS chip to understand the hardware settings, time, and anything else that's stored in it. The chip typically stores as little as 256 bytes of information.

## Interrupt Handlers

**Interrupt handlers** are small pieces of software that act as translators between the hardware components and the operating system. For example, when you press a key on your keyboard, the signal is sent to the keyboard interrupt handler, which tells the CPU what it is and passes it on to the operating system.

## Device Drivers

The **device drivers** are other pieces of software that identify the base hardware components such as keyboard, mouse, hard drive and floppy drive. Since the BIOS is constantly intercepting signals to and from the hardware, it is usually copied, or **shadowed**, into RAM to run faster.

## BDA

Also known as, BIOS Data Area.

- The BIOS Data Area is a reserved area of memory in the first 1 KB of RAM, starting at the memory address 0000:0400 and extending to 0000:04FF.
- It is used by the BIOS and operating system to store various system parameters and status information.
- The specific memory address 0000:0472 is part of this area and is used to indicate the type of boot (cold boot or reboot).

Q) But isn't RAM flushed when there is no power?
A) This can be stored in RAM since during a reboot the RAM never looses its power supply, so hence *THAT* memory location would hold its value. However, when a shutdown happens that memory is flushed out due to no power, and hence nothing (or garbage) would be stored in that memory location.

# References
https://search.brave.com/search?q=what+is+BIOS&source=desktop&summary=1&summary_og=7fb9a1edeb86d7952b1319