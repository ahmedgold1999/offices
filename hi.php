<?php
// توكن البوت الخاص بك
$botToken = "7054896104:AAHHcicT_dfl5UR60RqZDIGjem6Ot3eR7pw";
$website = "https://api.telegram.org/bot" . $botToken;

// الحصول على البيانات الواردة من المستخدم
$update = file_get_contents('php://input');
$update = json_decode($update, TRUE);

// معرفة ما إذا كان هناك رسالة من المستخدم
if (isset($update['message'])) {
    $chatId = $update['message']['chat']['id'];
    $messageText = $update['message']['text'];

    // رسالة ترحيبية ترسل فقط عند كتابة /start
    if ($messageText == "/start") {
        $welcomeMessage = "مرحبًا بك في البوت الخاص بنا!";
        file_get_contents($website . "/sendMessage?chat_id=" . $chatId . "&text=" . urlencode($welcomeMessage));
    }
}
?>
