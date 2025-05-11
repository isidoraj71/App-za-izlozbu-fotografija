<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Potvrda prijave</title>
</head>
<body>
    <h2>Uspešno ste se prijavili na izložbu: {{ $imeIzlozbe }}</h2>
    <p>U nastavku se nalazi Vaš QR kod za potvrdu prijave:</p>
    <img src="data:image/svg+xml;base64,{{ $qr }}" alt="QR kod" />
</body>
</html>
