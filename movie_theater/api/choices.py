CLASSIFICATION_CHOICES = [
    ('L', 'L (Livre)'),
    ('10', '10 anos'),
    ('12', '12 anos'),
    ('14', '14 anos'),
    ('16', '16 anos'),
    ('18', '18 anos'),
]

LANGUAGE_CHOICES = [
    ('pt-br', 'Português (Brasil)'),
    ('en', 'Inglês'),
]

FORMAT_CHOICES = [
    ('2D', '2D'),
    ('3D', '3D'),
    ('IMAX', 'IMAX'),
]

STATUS_CHOICES = [
    ('confirmed', 'Confirmada'),
    ('cancelled', 'Cancelada'),
]

PAYMENT_METHOD_CHOICES = [
    ('credit_card', 'Cartão de Cŕedito'),
    ('debit_card', 'Cartão de Débito'),
    ('pix', 'PIX'),
]

PAYMENT_STATUS_CHOICES = [
    ('pending', 'Pendente'),
    ('completed', 'Concluído'),
    ('failed', 'Fracassado'),
]