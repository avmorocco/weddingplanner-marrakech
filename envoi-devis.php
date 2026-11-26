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
$details = champ('details', 6000);
$page    = champ('page', 300);
$langue  = champ('langue', 5) === 'en' ? 'en' : 'fr';
$emailOk = filter_var($email, FILTER_VALIDATE_EMAIL) !== false;

// The forms differ by page: a phone number or a valid e-mail is enough to reply.
if (($nom === '' && $tel === '') || ($tel === '' && !$emailOk)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'champs']);
    exit;
}

$sujet = 'Demande de devis : ' . ($nom !== '' ? $nom : $tel);
$corps = "Nouvelle demande de devis depuis le site (" . strtoupper($langue) . ")\n\n"
       . "Nom : $nom\n"
       . "Téléphone / WhatsApp : $tel\n"
       . "E-mail : " . ($emailOk ? $email : '(non fourni)') . "\n\n"
       . "Formulaire :\n$details\n\n"
       . "Page : $page\n";

$entetes = [
    'From: Wedding Planner Marrakech <' . $EXPEDITEUR . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
];
if ($emailOk) {
    $entetes[] = 'Reply-To: ' . $email;
}

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
