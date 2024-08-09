from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.conf import settings
from ..models import Payment
import mercadopago

mp = mercadopago.SDK(settings.MERCADO_PAGO_ACCESS_TOKEN)

class PaymentView(APIView):
    def post(self, request):
        amount = request.data.get('amount')
        description = request.data.get('description', 'Payment')
        reservation = request.data.get('reservation')

        preference_data = {
            "items": [
                {
                    "title": description,
                    "quantity": 1,
                    "unit_price": float(amount),
                }
            ],
            "back_urls": {
                "success": "http://your-site.com/success",
                "failure": "http://your-site.com/failure",
                "pending": "http://your-site.com/pending"
            },
            "auto_return": "approved"
        }

        preference = mp.create_preference(preference_data)
        preference_id = preference['response']['id']

        payment = Payment.objects.create(
            user=request.user,
            reservation=reservation,
            amount=amount,
            method='mercadopago',
            status='pending',
            transaction_id=preference_id
        )

        return Response({'payment': payment}, status=status.HTTP_201_CREATED)