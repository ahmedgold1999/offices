// وظيفة لعرض البيانات
function displayData(data) {
    const tableBody = document.querySelector('#table tbody');
    const provinceSelect = document.querySelector('#provinceSelect');
    
    // نمر على جميع المحافظات والدوائر
    data.result.forEach(province => {
        const option = document.createElement('option');
        option.value = province.id;
        option.textContent = province.displayName;
        provinceSelect.appendChild(option);

        if (province.details) {
            province.details.forEach(detail => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${province.displayName}</td>
                    <td>${province.id}</td>
                    <td>${detail.displayName}</td>
                    <td>${detail.id}</td>
                `;
                tableBody.appendChild(row);
            });
        } else {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${province.displayName}</td>
                <td colspan="3">لا توجد تفاصيل</td>
            `;
            tableBody.appendChild(row);
        }
    });
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
            displayData(data);
            setupSearch(data.result);
        })
        .catch(error => {
            console.error('Error fetching the data:', error);
        });
}

// إعداد وظيفة البحث
function setupSearch(provinces) {
    const searchBox = document.querySelector('#searchBox');
    const tableBody = document.querySelector('#table tbody');

    searchBox.addEventListener('input', () => {
        const searchTerm = searchBox.value.toLowerCase();
        tableBody.innerHTML = ''; // تفريغ الجدول قبل عرض النتائج

        provinces.forEach(province => {
            if (province.details) {
                province.details.forEach(detail => {
                    if (detail.displayName.toLowerCase().includes(searchTerm)) {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${province.displayName}</td>
                            <td>${province.id}</td>
                            <td>${detail.displayName}</td>
                            <td>${detail.id}</td>
                        `;
                        tableBody.appendChild(row);
                    }
                });
            }
        });
    });
}

// استدعاء الوظيفة عند تحميل الصفحة
window.onload = fetchData;
