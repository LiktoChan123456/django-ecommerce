from django.contrib import admin
from store.models import Product, Category, Gallery, Specification, Size, Color
# Register your models here.

class GalleryInline(admin.TabularInline):
    model = Gallery

class SpecificationInline(admin.TabularInline):
    model = Specification


class SizeInline(admin.TabularInline):
    model = Size

class ColorInline(admin.TabularInline):
    model = Color

class ProductAdmin(admin.ModelAdmin):
    list_display = ['title', 'price','shipping_amount','stock_qty', 'in_stock','vendor', 'featured']
    list_editable = ['featured']
    list_filter = ['date']
    search_fields = ['title']
    inlines = [GalleryInline, SpecificationInline, SizeInline, ColorInline]


admin.site.register(Product, ProductAdmin)
admin.site.register(Category)