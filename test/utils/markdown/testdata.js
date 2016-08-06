'use strict';

exports.headers = [
[ '#Something', '<h1>Something</h1>' ],
[ '# Something', '<h1>Something</h1>' ], 
[ '#  Something', '<h1>Something</h1>' ], 
[ ' #Something', '<p> #Something</p>' ], 
[ '##Something', '<h2>Something</h2>' ], 
[ '### Something', '<h3>Something</h3>' ], 
[ '####### Something', '<h7>Something</h7>' ] ];

exports.formatting = [
[ '_italics_ not', '<p><i>italics</i> not</p>' ],
[ 'not _ italics _ ', '<p>not <i> italics </i> </p>' ],
[ '\\_italics\\_ not', '<p>_italics_ not</p>' ],
[ '*italics* not', '<p><i>italics</i> not</p>' ],
[ 'not * italics * ', '<p>not <i> italics </i> </p>' ],
[ '\\*italics\\* not', '<p>*italics* not</p>' ],
[ '**bold** not', '<p><b>bold</b> not</p>' ],
[ 'not ** bold ** ', '<p>not <b> bold </b> </p>' ],
[ '**bold** not', '<p><b>bold</b> not</p>' ]
]
