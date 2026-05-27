3rd Sep '24, 15:56pm

Status: #Completed #ProperNotes

Tags: [[Network]]

# SSH

The Secure Shell (SSH) protocol is a method for securely sending commands to a computer over an unsecured network. SSH uses cryptography to authenticate and encrypt connections between devices. SSH also allows for [tunneling](https://www.cloudflare.com/learning/network-layer/what-is-tunneling/), or port forwarding, which is when data packets are able to cross networks that they would not otherwise be able to cross. SSH is often used for controlling servers remotely, for managing infrastructure, and for transferring files.

> [!info]- Tunelling
> In networking, tunneling is a method for moving packets across a network using a protocol or path they would not ordinarily be able to use. Tunneling works by wrapping data packets with additional information (headers) to change their destination.

## What does SSH do?

**Remote encrypted connections:** SSH sets up a connection between a user's device and a faraway machine, often a server. It uses encryption to scramble the data that traverses the connection. An intercepting party would only find something like static — random data that means nothing unless it is decrypted. (SSH uses encryption methods that make decryption prohibitively difficult for outsiders.)

**The ability to tunnel:** SSH tunnels use a technique called port forwarding to send packets from one machine to another. Port forwarding is explained in more detail below.

## How does SSH work?

SSH runs on top of the TCP/IP protocol suite.

#### Public key cryptography

SSH is "secure" because it incorporates encryption and authentication via a process called public key cryptography. [Public key cryptography](https://www.cloudflare.com/learning/ssl/how-does-public-key-encryption-work/) is a way to encrypt data, or sign data, with two different keys. One of the keys, the public key, is available for anyone to use. The other key, the private key, is kept secret by its owner. Because the two keys correspond to each other, establishing the key owner's identity requires possession of the private key that goes with the public key.

These "asymmetric" keys — so called because they have different values — also make it possible for the two sides of the connection to negotiate identical, shared [symmetric keys](https://www.cloudflare.com/learning/ssl/what-is-asymmetric-encryption/) for further encryption over the channel. Once this negotiation is complete, the two sides use the symmetric keys to encrypt the data they exchange.

In an SSH connection, both sides have a public/private key pair, and each side authenticates the other using these keys. This differentiates SSH from [HTTPS](https://www.cloudflare.com/learning/ssl/what-is-https/), which in most implementations only verifies the identity of the web server in a client-server connection. (Other differences include that HTTPS usually does not allow the client to access the server's command line, and that [firewalls](https://www.cloudflare.com/learning/security/what-is-a-firewall/) sometimes block SSH but almost never block HTTPS.)

#### Authentication

While public key cryptography authenticates the connected devices in SSH, a properly secured computer will still require authentication from the person using SSH. Often this takes the form of entering a username and password.

Once authentication is complete, the person can execute commands on the remote machine as if they were doing so on their own local machine.

#### SSH tunneling, or 'port forwarding'

Port forwarding is like forwarding a message between two people. Bob may send a message to Alice, who in turn passes it to Dave. Similarly, port forwarding sends data packets directed at an IP address and port on one machine to an IP address and port on a different machine.

For example, imagine an administrator wants to make a change on a server inside a private network they manage, and they want to do so from a remote location. However, for security reasons, that server only receives data packets from other computers within the private network. The administrator could instead connect to a second server within the network — one that is open to receiving Internet traffic — and then use SSH port forwarding to connect to the first server. From the first server's perspective, the administrator's data packets are coming from inside the private network.

## What port does SSH use?

Port 22 is the default port for SSH. Sometimes, firewalls may block access to certain ports on servers behind the firewall, but leave port 22 open. SSH is therefore useful for accessing servers on the other side of the firewall: packets directed to port 22 are not blocked, and can then be forwarded to any other port.

## Are there any security risks associated with SSH?

Any protocol can be abused by malicious parties, and SSH's encrypted nature and tunneling capabilities make it particularly appealing to attackers. SSH has been used in a number of documented attacks in order to extract private data, open backdoor routes into a secure network, and even gain root access on servers.

Certain types of attacks can also steal SSH keys in order to access private computers and servers. In fact, SSH key management is a major security problem for large organizations, as their many servers may use thousands or even millions of keys, and tracking and updating those keys is close to impossible. Once an attacker gains a key, they may have persistent access for months or years.

## How does SSH contrast with other protocols for tunneling?

One of the main differences between SSH and other tunneling protocols is the [OSI layer](https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-model-osi/) at which they operate. [GRE](https://www.cloudflare.com/learning/network-layer/what-is-gre-tunneling/), IP-in-IP, and [IPsec](https://www.cloudflare.com/learning/network-layer/what-is-ipsec/) are all network layer protocols. As such, they are not aware of ports (a transport layer concept), instead operating between IP addresses. (SSH's exact OSI layer is not strictly defined, but most sources describe it as a [layer 7](https://www.cloudflare.com/learning/ddos/what-is-layer-7/)/application layer protocol.)

IPsec exclusively uses UDP instead of TCP in order to enable IPsec packets to pass through firewalls. Therefore, IPsec tunnels are typically faster than SSH tunnels, but can lose packets in transit. GRE and IP-in-IP can be used with either TCP or UDP.

Finally, SSH only encrypts one application at a time, not all traffic going to and from a device. This differentiates SSH from IPsec, which encrypts all network traffic, no matter which application it comes from. For this reason, SSH is not used for setting up [VPNs](https://www.cloudflare.com/learning/access-management/what-is-a-vpn/).

# References
https://www.cloudflare.com/learning/access-management/what-is-ssh/

# Also Check Out
https://docs.github.com/en/authentication/connecting-to-github-with-ssh
https://code.tutsplus.com/quick-tip-how-to-work-with-github-and-multiple-accounts--net-22574t