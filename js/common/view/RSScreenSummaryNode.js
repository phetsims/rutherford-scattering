// Copyright 2018-2020, University of Colorado Boulder

/**
 * A consistent Scene Summary node that can be used in all screen views.
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import inherit from '../../../../phet-core/js/inherit.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import RSA11yStrings from '../RSA11yStrings.js';

const screenSummaryString = RSA11yStrings.screenSummary.value;

/**
 * @constructor
 * @param {Object} [options]
 */
function RSScreenSummaryNode( options ) {
  Node.call( this, {
    tagName: 'p',
    innerContent: screenSummaryString
  } );
}

rutherfordScattering.register( 'RSScreenSummaryNode', RSScreenSummaryNode );

inherit( Node, RSScreenSummaryNode );
export default RSScreenSummaryNode;