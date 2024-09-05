var inp_as = document.getElementById('a_size'), array_size = inp_as.value;
var inp_gen = document.getElementById("a_generate");
var inp_aspeed = document.getElementById("a_speed");

var butts_algos = document.querySelectorAll(".algos button");

var div_sizes = [];
var divs = [];
var margin_size;
var cont = document.getElementById("array_container");
cont.style = "flex-direction:row";


inp_gen.addEventListener("click", generate_array);
inp_as.addEventListener("input", update_array_size);

function generate_array() {
    cont.innerHTML = "";

    for (var i = 0; i < array_size; i++) {
        div_sizes[i] = Math.floor(Math.random() * 0.5 * (inp_as.max - inp_as.min)) + 10;
        divs[i] = document.createElement("div");
        cont.appendChild(divs[i]);
        margin_size = 0.1;
        divs[i].style = " margin:0% " + margin_size + "%; background-color:blue; width:" + (100 / array_size - (2 * margin_size)) + "%; height:" + (div_sizes[i]) + "%;";
    }
}

function update_array_size() {
    array_size = inp_as.value;
    generate_array();
}

window.onload = update_array_size();


for (var i = 0; i < butts_algos.length; i++) {
    butts_algos[i].addEventListener("click", runalgo);
}

function disable_buttons() {
    for (var i = 0; i < butts_algos.length; i++) {
        butts_algos[i].classList = [];
        butts_algos[i].classList.add("butt_locked");

        butts_algos[i].disabled = true;
        inp_as.disabled = true;
        inp_gen.disabled = true;
        inp_aspeed.disabled = true;
    }
}

function runalgo() {
    disable_buttons();

    this.classList.add("butt_selected");
    switch (this.innerHTML) {
        case "Bubble":
            Bubble();
            displayCodeSnippet('Bubble');
            break;
        case "Selection":
            Selection_sort();
            displayCodeSnippet('Selection');
            break;
        case "Insertion":
            Insertion();
            displayCodeSnippet('Insertion');
            break;
        case "Merge":
            Merge();
            displayCodeSnippet('Merge');
            break;
        case "Quick":
            Quick();
            displayCodeSnippet('Quick');
            break;
        case "Heap":
            Heap();
            displayCodeSnippet('Heap');
            break;
    }
}


function displayCodeSnippet(algorithm) {
    let codeSnippet = '';
    
    switch (algorithm) {
        case 'Bubble':
            codeSnippet = `
    void bubbleSort(int arr[], int n) {
    int i, j, temp;
    for (i = 0; i < n-1; i++) {
        for (j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                // Swap arr[j] and arr[j+1]
                temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
}
 `;
            break;
            case 'Selection':
                codeSnippet = `
    void selectionSort(int arr[], int n) {
    for (int i = 0; i < n-1; i++) {
        int min = i;
        for (int j = i+1; j < n; j++) {
            if (arr[j] < arr[min]) {
                min = j;
            }
        }
       
        int temp = arr[min];
        arr[min] = arr[i];
        arr[i] = temp;
    }
}
}
`;
break;
        
            case 'Insertion':
                codeSnippet = `
    void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}
`
                
            break;

            case 'Merge':
                codeSnippet = `
                void merge(int A[], int b[], int m, int n) {
                int i, j, k;
                i=j=k=0;

                while(i<m && j<n)
                {
                  if(A[i]<B[j])
                   c[k++]=A[i++];
                  else
                   c[k++]=B[j++];
                }
            }
                for(;i<m;i++)
                    c[k++]=A[i];
                for(;j<n;j++)
                    c[k++]=B[j];
            }
                `
                break;
            
            case 'Quick':
                codeSnippet = `
    int partition ( int A[],int start ,int end) {
    int i = start + 1;
    int piv = A[start] ;            
    for(int j =start + 1; j <= end ; j++ )  {
   

          if ( A[ j ] < piv) {
                 swap (A[ i ],A [ j ]);
            i += 1;
        }
   }
   swap ( A[ start ] ,A[ i-1 ] ) ;  
   return i-1;
}
   void quick_sort ( int A[ ] ,int start , int end ) {
   if( start < end ) {
        
         int piv_pos = partition (A,start , end ) ;     
         quick_sort (A,start , piv_pos -1);    
         quick_sort ( A,piv_pos +1 , end) ;
   }
}`

        break;

        case 'Heap':
            codeSnippet = `
    void heapify(int arr[], int n, int i) {
    int largest = i, left = 2*i + 1, right = 2*i + 2;
    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;
    if (largest != i) {
        swap(&arr[i], &arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(int arr[], int n) {
    for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);
    for (int i = n - 1; i >= 0; i--) {
        swap(&arr[0], &arr[i]);
        heapify(arr, i, 0);
    }
}
`

break;           
    }

    document.getElementById('code_snippet').textContent = codeSnippet;
}


document.getElementById('bubble_sort_btn').addEventListener('click', function() {
    displayCodeSnippet('Bubble');
});
