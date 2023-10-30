window.onload = init;

let player, eq;
function init() {
    console.log('page chargée');
    
    player = document.querySelector('#player');
    eq = document.querySelector('#eq');
    eq.setContext(player.getContext());

    player.connect(eq.inputNode, eq.outputNode);
    // player.connect(eq);
}