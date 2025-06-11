from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('notes.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]


"""

"refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NjY1MTM2NSwiaWF0IjoxNzQ2NTY0OTY1LCJqdGkiOiI3ZjVhNTFmNWJjMGM0YzNjOTVkOTU4NTc2MjRlOGU0YyIsInVzZXJfaWQiOjF9._SLdd_fE51xWlZnPwhhnv7DeV_Hzs8qGYZZK4rRyOzE",
"access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ2NTY2MDAyLCJpYXQiOjE3NDY1NjQ5NjUsImp0aSI6IjRlOTc5YzJkN2U2NzQyZmNiMGVkNGZiOGZhNzUxMjkwIiwidXNlcl9pZCI6MX0.M2k1gXbQo5ZJ9HvTCL7v3_Co2agKHy4SXNil9hd24rQ"

"""
