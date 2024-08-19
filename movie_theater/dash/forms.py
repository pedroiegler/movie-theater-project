from django import forms
from ..models import Movie, Genre
from ..api.choices import LANGUAGE_CHOICES, CLASSIFICATION_CHOICES

class MovieForm(forms.ModelForm):
    class Meta:
        model = Movie
        fields = [
            'title',
            'description',
            'release_date',
            'duration',
            'genres',
            'director',
            'cast',
            'poster',
            'trailer_url',
            'in_theaters',
            'classification',
            'language',
        ]

    title = forms.CharField(
        required=True,
        widget=forms.TextInput(
            attrs={
                'class': 'w-full rounded-md border-gray-200 p-3 shadow-sm sm:text-sm'
            }
        )
    )

    description = forms.CharField(
        widget=forms.Textarea(
            attrs={'rows': 6, 'class': 'w-full rounded-md border-gray-200 p-3 shadow-sm sm:text-sm'}
        ),
        required=True
    )


    release_date = forms.DateField(
        required=True,
        widget=forms.DateInput(
            attrs={
                'class': 'w-full rounded-md border-gray-200 p-3 shadow-sm sm:text-sm',
                'type': 'date'  
            }
        )
    )

    duration = forms.IntegerField(
        required=True,
        widget=forms.NumberInput(
            attrs={
                'class': 'w-full rounded-md border-gray-200 p-3 shadow-sm sm:text-sm'
            }
        )
    )

    genres = forms.ModelMultipleChoiceField(
        queryset=Genre.objects.all(),
        widget=forms.CheckboxSelectMultiple(
            attrs={'class': 'form-checkbox rounded-md border-gray-200 p-2 text-blue-800'}
        ),
        required=False
    )

    director = forms.CharField(
        required=False,
        widget=forms.TextInput(
            attrs={'class': 'w-full rounded-md border-gray-200 p-3 shadow-sm sm:text-sm'}
        ),
    )


    cast = forms.CharField(
        required=False,
        widget=forms.TextInput(
            attrs={
                'placeholder': 'Lista de nomes de atores separados por vírgulas',
                'class': 'w-full rounded-md border-gray-200 p-3 shadow-sm sm:text-sm'
            }
        )
    )
    
    trailer_url = forms.URLField(
        required=False,
        widget=forms.URLInput(
            attrs={
                'placeholder': 'https://trailer-url.com',
                'class': 'w-full rounded-md border-gray-200 p-3 shadow-sm sm:text-sm'
            }
        )
    )

    in_theaters = forms.BooleanField(
        required=False,
        widget=forms.CheckboxInput(
            attrs={'class': 'form-checkbox rounded-md border-gray-200 p-2 text-blue-800'}
        )
    )

    poster = forms.ImageField(
        required=False,
        widget=forms.ClearableFileInput(
            attrs={'class': 'w-full rounded-md border-gray-200 p-3 shadow-sm sm:text-sm'}
        )
    )

    classification = forms.MultipleChoiceField(
        required=True,
        widget=forms.Select(
            attrs={'class': 'w-full rounded-md border-gray-200 p-3 shadow-sm sm:text-sm'}
        ),
        choices=CLASSIFICATION_CHOICES
    )
   
    language = forms.MultipleChoiceField(
        required=False,
        widget=forms.Select(
            attrs={'class': 'w-full rounded-md border-gray-200 p-3 shadow-sm sm:text-sm'}
        ),
        choices=LANGUAGE_CHOICES
    )
