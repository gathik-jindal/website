23rd May '25, 10:11pm

Status: #Completed #ProperNotes 

Tags: [[Graphs]] [[Maths]] [[Network]] [[Undirected Graph]] [[Machine Learning]] [[Supervised Learning]] [[Neural Networks]]

# Introduction To Machine Learning

Machine learning is about teaching computers to learn from data—improving their performance without being explicitly programmed. This broad umbrella includes a range of techniques: **supervised learning** for prediction and classification, **unsupervised learning** for discovering hidden patterns, and **reinforcement learning** where agents learn to make decisions through trial and error.

For now we will learn about supervised learning.

# Supervised Learning

Here, learning takes place in a supervised fashion, this works best when we know the definitive answer to inputs. Sometimes we might want to group random data, based on patterns and hidden meanings we can't identify, that's when we would want to use unsupervised learning.

This is very straightforward, there's input with matching (expected) output, we train a model on this. Then we give it new data and see whether it can accurately classify this new data into the one the outputs from our set.

### Neural Networks

Neural networks are inspired by how the brain functions, it uses a similar functionality and it somehow works well. We use these networks in all kinds of machine learning models.  We will first learn about FFNNs also known as feed forward neural networks, here there are no backward edges or loops. Here's how they work:

- They work in layers, input layer; hidden layer(s); output layer.
- Each layer has a set of nodes and outgoing edges from each node to every other node in the next layer.
- Each edge has a weight $W_{ijk}$ , $i$ stands for layer, $j$ stands for node in that layer and $k$ stands for node in the next layer.
- Each node has an activation, this will be understood as we move on.

![[Pasted image 20250525085550.png|500]]

Lets now move by example, lets say we want to train a model to understand handwritten digits. Our inputs our 32x32 pixel images (black and white), this means that our input layer will have $32^2$ number of nodes, and each node will be either a 1 or a 0 depending if its colored or not, so our activation in the first layer is either a 0 or a 1.

The activation for nodes in the next layer are then calculated with this formula:
$$
A_{ij} = \sigma(\sum_{j'} A_{i-1j'}*W_{i-1j'j} + b_{ij})
$$

Here, the $\sigma$ function is applied mostly so that the activation stays between 0 and 1. There are different functions used based on use cases, currently $RELU(a)$ is being used around. $b_{ij}$ is the bias for that node, one can interpret this as giving a node a push even though the nodes and weights supporting it are weak.

After final layer nodes are calculated we take interpret them how we like. In our case we would have 10 nodes, each representing a digit from 0 to 9. And the one with the highest activation would suggest that our image displays this number. So on this understanding we train our model. We'll go deeper on how this training is done, for now you can understand that adjusting the weights and biases is what training means here.

Lets dig deeper on these hidden layers. One might ask, "Why the layered structure?", well with a layered structure we hope that each layer breaks down the digits into patterns that help the network to decide the digits. These patterns could be edges, loops etc. Each layer could build on the patterns observed by the previous layer, like two loops could mean an 8, a straight line could mean a 1 etc. In reality this might not be what its actually doing, but what we know for sure is that, it build on some relationship from the previous layer, and hence why the layered structure is important.

#### Training the network

Initially we set random weights and biases, and as expected for any input we get random activations in the last layer. So by training our model we expect to get the highest activation for the desired output and all other activation are much lesser, easier to differentiate.

To achieve this we define a $cost$ function, this will tell us how well our output is, the is the sum of the squared differences of our output nodes from the expected output. So then we take the average over all our training data and this will be our $cost$.

So our goal is now to minimize this cost function, since the cost function is like a correlation between our expected output and given output.

To minimize the cost function we add each weight and bias with the negative of the gradient of the cost function over all training data. I won't be going over the exact math over it here, but if you want to check it out one can watch this video [here](https://www.youtube.com/watch?v=Ilg3gGewQ5U&list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi&index=3).

# References
https://www.youtube.com/watch?v=aircAruvnKk&list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi