from django.db import models
from django.db.models import Model 
from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin,BaseUserManager
from django.utils import timezone
from django.db import transaction
class UserManager(BaseUserManager):
 
    def _create_user(self, email, password, **extra_fields):
        
        if not email:
            raise ValueError('The given email must be set')
        try:
            with transaction.atomic():
                user = self.model(email=email, **extra_fields)
                user.set_password(password)
                user.save(using=self._db)
                return user
        except:
            raise
    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)
 
    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self._create_user(email, password=password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):

    email = models.EmailField(max_length=40, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    gender=models.CharField(default="",max_length=10)
    birthdate=models.DateField(auto_now=True)
    objects = UserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['gender','birthdate']
    def save(self, *args, **kwargs):
        super(User, self).save(*args, **kwargs)
        return self
