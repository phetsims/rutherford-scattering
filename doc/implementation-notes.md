
This implementation was a port from the original java sim.

Model:

RSBaseModel contains the active particle lists as well as the addition/removal functions for them.  The base
model also allows for a collection of AtomSpaces, a space in which particles and atoms exist.  Both models are
derived off this class.  The AtomSpace and Atom both track active particle lists as well.  When a particle is created,
it is added to the base model and the space.  When a particle enters the bounding box of an atom, it is removed
from the space and added to the atom.  This way, the space can handle the trajectory of particles moving
straight through the space while the atom can handle particles within its bounds that have complex trajectories.
When a particle enters the bounds of a new atom, it is added to the new atom and removed form the previous atom's
particle list.

Details of the Rutherford trajectory computations can be found in the PDF document included.
Plum Pudding is very straight forward.

View:

The RSBaseScreenView handles the layout for both screens. However, each screen implements it's own 'space'
(i.e. RutherfordAtomSpaceNode & PlumPuddingSpaceNode) which render specifics of the different models. Each of these
spaces are derived off of ParticleSpaceNode which handles the rendering of the active alpha particles. This is based
on a CanvasNode for performance reason.
