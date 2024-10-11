// وظيفة لعرض البيانات
function displayData(data) {
    const tableBody = document.querySelector('#table tbody');
    
    // نمر على جميع المحافظات والدوائر
    data.result.forEach(province => {
        if (province.details) {
            province.details.forEach(detail => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${province.displayName}</td>
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
        })
        .catch(error => {
            console.error('Error fetching the data:', error);
        });
}

// استدعاء الوظيفة عند تحميل الصفحة
window.onload = fetchData;
