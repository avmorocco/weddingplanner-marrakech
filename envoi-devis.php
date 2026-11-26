<?php
// Receives the quote form and emails it to the business inbox.
// Called by assets/js/main.js. Returns JSON: {"ok":true} or {"ok":false,"error":"..."}.
header('Content-Type: application/json; charset=utf-8');
header('X-Robots-Tag: noindex');

$DESTINATAIRE = 'ocrewedding.marrakech@gmail.com';
// OVH only delivers mail sent from an address on the hosted domain.
$EXPEDITEUR   = 'site@weddingplanner-marrakech.com';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method']);
    exit;
}

// Honeypot field: real visitors leave it empty, spam bots fill it.
if (!empty($_POST['site_web'])) {
    echo json_encode(['ok' => true]);
    exit;
}

function champ($nom, $max = 500) {
    $v = isset($_POST[$nom]) ? trim((string) $_POST[$nom]) : '';
    $v = str_replace(["\r", "\0"], '', $v);
    return mb_substr($v, 0, $max, 'UTF-8');
}

$nom     = champ('nom', 120);
$tel     = champ('telephone', 40);
$email   = champ('email', 160);
$type    = champ('type', 120);
$date    = champ('date', 40);
$invites = champ('invites', 80);
$lieu    = champ('lieu', 120);
$budget  = champ('budget', 80);
$details = champ('details', 4000);
$langue  = champ('langue', 5) === 'en' ? 'en' : 'fr';

if ($nom === '' || $tel === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'champs']);
    exit;
}

$sujet = 'Demande de devis : ' . $nom . ($date !== '' ? ' (' . $date . ')' : '');
$corps = "Nouvelle demande de devis depuis le site (" . strtoupper($langue) . ")\n\n"
       . "Nom : $nom\n"
       . "Téléphone / WhatsApp : $tel\n"
       . "E-mail : $email\n"
       . "Type d'événement : $type\n"
       . "Date souhaitée : $date\n"
       . "Nombre d'invités : $invites\n"
       . "Lieu envisagé : $lieu\n"
       . "Budget estimé : $budget\n\n"
       . "Détails :\n$details\n";

$entetes = [
    'From: Wedding Planner Marrakech <' . $EXPEDITEUR . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
];

$ok = mail(
    $DESTINATAIRE,
    '=?UTF-8?B?' . base64_encode($sujet) . '?=',
    $corps,
    implode("\r\n", $entetes),
    '-f' . $EXPEDITEUR
);

if (!$ok) {
    http_response_code(500);
}
echo json_encode(['ok' => (bool) $ok]);
