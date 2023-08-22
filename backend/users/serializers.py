from rest_framework import serializers
from users.models import CustomUser


class CustomUserSerializer(serializers.ModelSerializer):
    """
    Currently unused in preference of the below.
    """
    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = CustomUser
        fields = ('email', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        # as long as the fields are the same, we can just use this
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)

        sameEmail = CustomUser.objects.filter(email=validated_data["email"])
        if sameEmail.count() :
            error = {'Email' : ['There are already users with this email.']}
            raise serializers.ValidationError(error)

        sameUsername = CustomUser.objects.filter(username=validated_data["username"])
        if sameUsername.count() :
            error = {'Username' : ['There are already users with this username.']}
            raise serializers.ValidationError(error)

        instance.save()
        return instance