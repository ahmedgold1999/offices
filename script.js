// وظيفة لعرض المحافظات في القائمة المنسدلة
function populateProvinces(data) {
    const provinceSelect = document.querySelector('#provinceSelect');

    // إضافة المحافظات إلى القائمة المنسدلة
    data.result.forEach(province => {
        const option = document.createElement('option');
        option.value = province.id;
        option.textContent = province.displayName;
        provinceSelect.appendChild(option);
    });

    // إضافة حدث عند تغيير المحافظة
    provinceSelect.addEventListener('change', (event) => {
        const selectedProvinceId = event.target.value;
        if (selectedProvinceId) {
            displayProvinceDetails(data, selectedProvinceId);
        } else {
            clearTable(); // إذا لم يتم اختيار محافظة، يتم مسح الجدول
        }
    });
}

// وظيفة لعرض تفاصيل الدوائر بناءً على المحافظة المختارة
function displayProvinceDetails(data, provinceId) {
    const tableBody = document.querySelector('#table tbody');
    clearTable(); // مسح الجدول قبل تعبئته بالبيانات الجديدة

    const selectedProvince = data.result.find(province => province.id == provinceId);

    if (selectedProvince && selectedProvince.details) {
        selectedProvince.details.forEach(detail => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${selectedProvince.displayName}</td>
                <td>${detail.displayName}</td>
                <td>${detail.id}</td>
            `;
            tableBody.appendChild(row);
        });
    } else {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${selectedProvince.displayName}</td>
            <td colspan="2">لا توجد تفاصيل</td>
        `;
        tableBody.appendChild(row);
    }
}

// وظيفة لمسح الجدول
function clearTable() {
    const tableBody = document.querySelector('#table tbody');
    tableBody.innerHTML = '';
}

// استيراد البيانات من ملف JSON باستخدام fetch API
function fetchData() {
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('HTTP error ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            populateProvinces(data); // عرض المحافظات في القائمة المنسدلة
        })
        .catch(error => {
            console.error('Error fetching the data:', error);
        });
}

// استدعاء الوظيفة عند تحميل الصفحة
window.onload = fetchData;
