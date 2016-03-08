
This implementation was a port from the original java sim.

Model:

RSBaseModel contains the active particle lists as well as the addition/removal functions for them. Both models are
derived off this class and simply implement how to move the particles on each simulation step. Details of the Rutherford
trajectory computations can be found in the PDF document included. Plum Pudding is very straight forward.

View:

The RSBaseScreenView handles the layout for both screens. However, each screen implements it's own 'space'
(i.e. RutherfordAtomSpaceNode & PlumPuddingSpaceNode) which render specifics of the different models. Each of these
spaces are derived off of ParticleSpaceNode which handles the rendering of the active alpha particles. This is based
on a CanvasNode for performance reason.
