from django.contrib.postgres.fields import ArrayField
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
# from django.contrib.gis.db import models as gis_models  # Temporarily disabled for SQLite
# from django.contrib.gis.geos import Point  # Temporarily disabled for SQLite
# from geopy.geocoders import Nominatim  # Temporarily disabled for SQLite
# from geopy.exc import GeocoderTimedOut, GeocoderServiceError  # Temporarily disabled for SQLite

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_staffuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', False)
        return self.create_user(email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    # Add user roles
    is_customer = models.BooleanField(default=False)
    is_mechanic = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return self.email

class CustomerProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=20, blank=True)
    address = models.TextField(blank=True)
    zip_code = models.CharField(max_length=10, blank=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.user

class MechanicProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    business_name = models.CharField(max_length=255)
    business_info = models.CharField(max_length=4096, blank=True)
    heard_info = models.CharField(max_length=4096, blank=True)
    job_title = models.CharField(max_length=30, blank=True)
    rating = models.FloatField(default=0.0)
    years_of_experience = models.IntegerField(blank=True,null=True)
    phone_number = models.CharField(max_length=20, blank=True)
    web_site = models.TextField(blank=True)
    address = models.TextField(blank=True)
    address_city = models.TextField(blank=True)
    address_state = models.TextField(blank=True)
    zip_code = models.CharField(max_length=10)
    certifications = models.CharField(max_length=255, blank=True)
    is_mobile = models.BooleanField(default=False)
    availability = models.JSONField(default=dict, null=True)  # Stores available hours/days in JSON format
    map_verified = models.CharField(max_length=40, blank=True)
    address_latitude = models.DecimalField(max_digits=20, decimal_places=15, null=True)
    address_longitude = models.DecimalField(max_digits=20, decimal_places=15, null=True)
    # location = gis_models.PointField(null=True, geography=True)  # Temporarily disabled for SQLite
    verified = models.BooleanField(default=False)
    # offered_services = ArrayField(models.CharField(max_length=200, blank=True), blank=True, null=True)  # Temporarily disabled for SQLite
    offered_services = models.TextField(blank=True, null=True)  # Temporary replacement for ArrayField

    def __str__(self):
        return self.business_name
    
    def save(self, *args, **kwargs):
        if not self.address_latitude or not self.address_longitude:
            try:
                geolocator = Nominatim(user_agent="doneez")
                location = geolocator.geocode(self.zip_code)
                if location:
                    self.address_latitude = location.latitude
                    self.address_longitude = location.longitude
            except (GeocoderTimedOut, GeocoderServiceError):
                # Handle the exception (e.g., log it or retry)
                pass

        if self.address_latitude and self.address_longitude:
            self.location = Point(float(self.address_longitude), float(self.address_latitude), srid=4326)
        
        super(MechanicProfile, self).save(*args, **kwargs)

class Vehicles(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='vehicles')
    vehicle_make = models.CharField(max_length=100)
    vehicle_model = models.CharField(max_length=100)
    vehicle_year = models.IntegerField()
    vehicle_mileage = models.IntegerField()

    def __str__(self):
        return self.user    

class ServiceItems(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    estimated_time = models.DurationField()  # Store estimated time as duration
    base_price = models.DecimalField(max_digits=10, decimal_places=2)
    
    def __str__(self):
        return self.name

class MechanicServices(models.Model):
    mechanic = models.ForeignKey(MechanicProfile, on_delete=models.CASCADE)
    service_item = models.ForeignKey(ServiceItems, on_delete=models.CASCADE)

    def __str__(self):
        return self.mechanic.business_name

class QuoteRequest(models.Model):
    customer = models.ForeignKey(CustomerProfile, on_delete=models.CASCADE, related_name='quote_requests')
    service = models.ForeignKey(ServiceItems, on_delete=models.CASCADE, related_name='quotes')
    preferred_date = models.DateField()
    description = models.TextField(blank=True)
    photos = models.ImageField(upload_to='service_photos/', blank=True)  # Optional photo upload
    status = models.CharField(max_length=20, choices=[('pending', 'Pending'), ('accepted', 'Accepted'), ('rejected', 'Rejected')], default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Quote Request by {self.customer.full_name}"
    
        # Method to calculate total price of all services
    def get_total_price(self):
        total_price = sum(service.base_price for service in self.services.all())
        return total_price
    

class Quote(models.Model):
    mechanic = models.ForeignKey(MechanicProfile, on_delete=models.CASCADE, related_name='quotes')
    quote_request = models.ForeignKey(QuoteRequest, on_delete=models.CASCADE, related_name='quotes')
    total_cost = models.DecimalField(max_digits=10, decimal_places=2)
    estimate_details = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)
    accepted = models.BooleanField(default=False)
    
    def __str__(self):
        return f"Quote from {self.mechanic.shop_name} for {self.quote_request.id}"

class Appointment(models.Model):
    quote = models.OneToOneField(Quote, on_delete=models.CASCADE)
    appointment_date = models.DateTimeField()
    customer_note = models.TextField(blank=True)
    mechanic_note = models.TextField(blank=True)
    completed = models.BooleanField(default=False)
    
    def __str__(self):
        return f"Appointment for {self.quote}"

class Payment(models.Model):
    customer = models.ForeignKey(CustomerProfile, on_delete=models.CASCADE)
    mechanic = models.ForeignKey(MechanicProfile, on_delete=models.CASCADE)
    appointment = models.ForeignKey(Appointment, on_delete=models.CASCADE, related_name='payments')
    payment_date = models.DateTimeField(auto_now_add=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    deposit_amount = models.DecimalField(max_digits=10, decimal_places=2)
    balance_due = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=20, choices=[('credit', 'Credit Card'), ('debit', 'Debit Card'), ('cash', 'Cash')])

    def __str__(self):
        return f"Payment by {self.customer.user.first_name}"

class Review(models.Model):
    customer = models.ForeignKey(CustomerProfile, on_delete=models.CASCADE)
    mechanic = models.ForeignKey(MechanicProfile, on_delete=models.CASCADE, related_name='reviews')
    appointment = models.ForeignKey(Appointment, on_delete=models.CASCADE)
    rating = models.IntegerField()
    review_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Review for {self.mechanic.business_name} by {self.customer.user.first_name}"

class Message(models.Model):
    sender = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='sent_messages')
    receiver = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='received_messages')
    appointment = models.ForeignKey(Appointment, on_delete=models.CASCADE, related_name='messages')
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)
    
    def __str__(self):
        return f"Message from {self.sender} to {self.receiver}"
