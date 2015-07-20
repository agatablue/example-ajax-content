<?php

usleep(2000); // Stale opoznienie akcji

$response = array();
// Odbieram dane przesłane POSTem
$action = (int)$_POST['action_id'];
// Rozkładam kolejne ID akcji na response jednego z 3 typow
switch (TRUE) {
    case $action % 3 == 0: // ~33%
        $response = array('id' => $action,
            'type' => 'display',
            'data' => array('div.first' => array('h1' => array('text_contents' => 'Header text'),
                'p' => array('text_contents' => 'Some text goes here')),
                'div.second' => array('span' => array('span' => array('text_contents' => 'Span inside span')),
                    'b' => array('text_contents' => 'Simple B tag'))
            ));
        // Render: <div class="first"><h1>Header text</h1><p>Some text goes here</p></div><div class="second"><span><span>Span inside span</span></span><b>Simple B tag</b></div>
        break;
    case $action % 2 == 0: // ~33%
        $response = array('id' => $action,
            'type' => 'trigger',
            'data' => array('decorate'));
        break;
    default: // ~33%
        $response = array('id' => $action,
            'type' => 'null',
            'data' => NULL);
        break;
}
// Printuje informacje w formacie JSON
print json_encode($response);

?>