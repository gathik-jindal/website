19th Jun '26, 11:44am

Status: #Completed #ProperNotes 

Tags: [[Framework]] [[Network]] [[Network Transparency]]

# gRPC

gRPC stands for gRPC remote procedural call (recursive acronym). As the name suggests this is a framework that lets clients call methods (implemented on a server) as if it was locally available.

>As in many RPC systems, gRPC is based around the idea of defining a service, specifying the methods that can be called remotely with their parameters and return types. On the server side, the server implements this interface and runs a gRPC server to handle client calls. On the client side, the client has a stub (referred to as just a client in some languages) that provides the same methods as the server.

![[grpc-architecture.svg]]



# References
https://opensource.google/projects/grpc
https://grpc.io/docs/what-is-grpc/introduction/