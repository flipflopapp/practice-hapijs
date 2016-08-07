'use strict';

exports.headers = [
[ '#Something', '<h1>Something</h1>' ],
[ '# Something', '<h1>Something</h1>' ], 
[ '#  Something', '<h1>Something</h1>' ], 
[ ' #Something', '<p> #Something</p>' ], 
[ '##Something', '<h2>Something</h2>' ], 
[ '### Something', '<h3>Something</h3>' ], 
[ '####### Something', '<h7>Something</h7>' ],
[ '####### _Something_', '<h7><i>Something</i></h7>' ],
[ '####### **Something**', '<h7><strong>Something</strong></h7>' ]
];

exports.formatting = [
[ '_italics_ not', '<p><i>italics</i> not</p>' ],
[ 'not _ italics _ ', '<p>not <i> italics </i> </p>' ],
[ '\\_italics\\_ not', '<p>_italics_ not</p>' ],
[ '*emphasized* not', '<p><em>emphasized</em> not</p>' ],
[ 'not * emphasized * ', '<p>not <em> emphasized </em> </p>' ],
[ '\\*italics\\* not', '<p>*italics* not</p>' ],
[ '**bold** not', '<p><strong>bold</strong> not</p>' ],
[ 'not ** bold ** ', '<p>not <strong> bold </strong> </p>' ],
[ '**bold** not', '<p><strong>bold</strong> not</p>' ]
];

exports.links = [
[ 'see [Wikipedia](http://en.wikipedia.org/wiki/Markdown)', '<p>see <a href="http://en.wikipedia.org/wiki/Markdown">Wikipedia</a></p>' ],
[ 'see [Wikipedia](http://en.wikipedia.org/wiki/Markdown) or [Github](https://help.github.com/articles/basic-writing-and-formatting-syntax/)', '<p>see <a href="http://en.wikipedia.org/wiki/Markdown">Wikipedia</a> or <a href="https://help.github.com/articles/basic-writing-and-formatting-syntax/">Github</a></p>' ]
];
