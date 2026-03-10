// Copyright 2016-2025, University of Colorado Boulder

/**
 * Visual representation of a plum pudding atom, consisting of the pudding blob image with
 * electrons drawn programmatically on top.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 * @author Dave Schmitz (Schmitzware)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import plumPudding_png from '../../../images/plumPudding_png.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import ParticleNodeFactory, { ELECTRON_RADIUS } from '../../common/view/ParticleNodeFactory.js';

// Electron positions as [x, y] pixel coordinates within the 1912 × 1700 image space,
// extracted from the original plum-pudding atom PNG by providing the png to Claude code.
// After review the resulting image matches exactly to the original.
const ELECTRON_POSITIONS: [ number, number ][] = [
  [ 1185, 217 ], [ 1385, 247 ], [ 1015, 272 ], [ 894, 284 ],
  [ 1065, 367 ], [ 1248, 372 ], [ 686, 384 ], [ 1443, 395 ],
  [ 885, 413 ], [ 1131, 430 ], [ 1350, 438 ], [ 615, 476 ],
  [ 1146, 522 ], [ 748, 538 ], [ 1350, 548 ], [ 1519, 549 ],
  [ 452, 551 ], [ 943, 555 ], [ 631, 597 ], [ 1248, 613 ],
  [ 819, 634 ], [ 446, 648 ], [ 723, 654 ], [ 948, 667 ],
  [ 1381, 676 ], [ 1093, 695 ], [ 1573, 697 ], [ 544, 700 ],
  [ 344, 730 ], [ 1265, 734 ], [ 465, 752 ], [ 710, 752 ],
  [ 1165, 754 ], [ 1450, 772 ], [ 1094, 784 ], [ 610, 796 ],
  [ 1294, 813 ], [ 919, 838 ], [ 477, 852 ], [ 769, 872 ],
  [ 285, 876 ], [ 1019, 876 ], [ 1427, 904 ], [ 1150, 938 ],
  [ 1627, 938 ], [ 402, 950 ], [ 823, 984 ], [ 1349, 984 ],
  [ 1035, 997 ], [ 515, 1013 ], [ 665, 1022 ], [ 1494, 1063 ],
  [ 594, 1080 ], [ 1198, 1080 ], [ 1681, 1084 ], [ 969, 1099 ],
  [ 793, 1105 ], [ 1410, 1126 ], [ 419, 1134 ], [ 1561, 1154 ],
  [ 473, 1213 ], [ 1300, 1230 ], [ 650, 1234 ], [ 847, 1252 ],
  [ 1093, 1253 ], [ 535, 1296 ], [ 1460, 1297 ], [ 919, 1304 ],
  [ 448, 1313 ], [ 1119, 1317 ], [ 723, 1330 ], [ 1227, 1363 ],
  [ 860, 1426 ], [ 1346, 1430 ], [ 1019, 1434 ], [ 1115, 1488 ],
  [ 935, 1496 ], [ 1223, 1502 ]
];

class PlumPuddingAtomNode extends Node {

  // The intended display dimensions after scaling — used by PlumPuddingSpaceNode for drawImage positioning.
  // The node itself is kept at natural image resolution so rasterizeNode captures full detail.
  public readonly displayWidth: number;
  public readonly displayHeight: number;

  public constructor( spaceNodeBounds: Bounds2, options?: NodeOptions ) {
    super( options );

    // the plum pudding pngs were switched out and in order to match the exact size rendered in the original the scale
    // needs to be fudged a little bit.
    const scale = Math.min( spaceNodeBounds.width, spaceNodeBounds.height ) /
                  ( Math.max( plumPudding_png.width, plumPudding_png.height ) ) + 0.0005;

    // Electron radius in image-pixel space: after drawImage downsamples by `scale`, the visual radius = ELECTRON_RADIUS.
    const electronRadius = ELECTRON_RADIUS / scale;

    this.addChild( new Image( plumPudding_png ) );

    for ( const [ x, y ] of ELECTRON_POSITIONS ) {
      const electron = ParticleNodeFactory.createElectron( electronRadius );
      electron.centerX = x;
      electron.centerY = y;
      this.addChild( electron );
    }

    // Do NOT call setScaleMagnitude — keep the node at natural image resolution so rasterizeNode
    // captures full detail. PlumPuddingSpaceNode uses displayWidth/displayHeight for drawImage.
    this.displayWidth = plumPudding_png.width * scale;
    this.displayHeight = plumPudding_png.height * scale;
  }
}

rutherfordScattering.register( 'PlumPuddingAtomNode', PlumPuddingAtomNode );
export default PlumPuddingAtomNode;