<template>
  <div>
    <ve-table :columns="columns" :table-data="tableData"  :sort-option="sortOption"/>
    <div class="table-pagination">
      <ve-pagination
        :total="totalCount"
        :page-index="pageIndex"
        :page-size="pageSize"
        @on-page-number-change="pageNumberChange"
        @on-page-size-change="pageSizeChange"
      />
    </div>
  </div>
</template>

<style>
  .table-pagination {
    margin-top: 20px;
    text-align: right;
  }
</style>

<script>
  // Simulation table data from database
//  let DB_DATA = [];

  export default {
    data() {
      return {
        DB_DATA : [],
        searchValue: "",
        sortOption: {
          sortChange: (params) => {
            this.sortChange(params);
          },
        },
        // page index
        pageIndex: 1,
        // page size
        pageSize: 10,
        columns: [
          /*
          {
            field: number,
            key: "a",
            title: "Number",
            align: "center",
            //renderBodyCell: ({ row, column, rowIndex }, h) => {
            //  return (this.pageIndex - 1) * this.pageSize + rowIndex + 1;
            //},
          }, 
          */
          { field: "family", key: "a", title: "Фамилия", width: "", sortBy: "",
 // filter custom
            filterCustom: {
              defaultVisible: true,
              /*eslint-disable */
              render: ({ showFn, closeFn }, h) => {
              /*eslint-enable */
                return (
                  <div class="custom-name-filter">
                    <input
                      value={this.searchValue}
                      on-input={(e) => (this.searchValue = e.target.value)}
                      placeholder="Search name"
                    />
                    <div class="custom-name-filter-operation">
                      <span class="name-filter-cancel" on-click={() => this.searchCancel(closeFn)}>
                        ⌫
                      </span>
                      <span
                        class="name-filter-confirm"
                        on-click={() => this.searchConfirm(closeFn)}
                      >
                        ⏎
                      </span>
                    </div>
                  </div>
                );
              },
              // custom filter icon
              filterIcon: () => {
                return <ve-icon name="search" />;
              },
            },          
          },
          { field: "name", key: "b", title: "Имя", align: "center", sortBy: ""
         
          },
          { field: "sname", key: "c", title: "Отчество", align: "left", sortBy: "" },
          { field: "active", key: "d", title: "Активность", width: "", sortBy: "" },
          { field: "date", key: "e", title: "Дата Входа", align: "left", sortBy: ""},
        ],
      };
    },
    computed: {
      // table data
      tableData() {
        const { pageIndex, pageSize } = this;
        return this.DB_DATA.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
      },
      // total count
      totalCount() {
        return this.DB_DATA.length;
      },
    },
    methods: {
      // page number change
      pageNumberChange(pageIndex) {
        this.pageIndex = pageIndex;
      },

      // page size change
      pageSizeChange(pageSize) {
        this.pageIndex = 1;
        this.pageSize = pageSize;
      },
      activeIs(i) {
        if (i%3) {return "✅"} 
        else {return "😴"} 
      },
      // search
      search() {
        const searchValue = this.searchValue;
        console.log(searchValue)
        console.log(searchValue.length)
        //this.sortChange(this.sortOption.sortChange());
        //this.tableData
        //this.tableData = this.tableDataPag; 
        this.DB_DATA = this.DB_DATA.filter(
          (x) => !searchValue.length || x.name.toLowerCase().includes(searchValue.toLowerCase())
          || x.sname.toLowerCase().includes(searchValue.toLowerCase())
          || x.family.toLowerCase().includes(searchValue.toLowerCase())
          || x.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        this.$forceUpdate();
      },
      searchCancel(closeFn) {
        closeFn();
      },
      searchConfirm(closeFn) {
        this.search();
        closeFn();
      },
      sortChange(params) {
        console.log("sortChange::", params);
        this.tableData.sort((a, b) => {
          if (params.date) {
            console.log('1')
            if (params.date === "asc") {
              return a.name.localeCompare(b.name)
            } else if (params.date === "desc") {
              return b.name.localeCompare(a.name)
            } else {
              return 0;
            }
          } else if (params.active) {
            if (params.active === "asc") {
              return a.active.localeCompare(b.active)
            } else if (params.active === "desc") {
              return b.active.localeCompare(a.active)
            } else {
              return 0;
            }
          } else if (params.name) {
            if (params.name === "asc") {
              return a.name.localeCompare(b.name)
            } else if (params.name === "desc") {
              return b.name.localeCompare(a.name)
            } else {
              return 0;
            }
          }
          else if (params.sname) {
            if (params.sname === "asc") {
              return a.sname.localeCompare(b.sname)
            } else if (params.sname === "desc") {
              return b.sname.localeCompare(a.sname)
            } else {
              return 0;
            }
          }
          else if (params.family) {
            if (params.family === "asc") {
              return a.family.localeCompare(b.family)
            } else if (params.family === "desc") {
              return b.family.localeCompare(a.family)
            } else {
              return 0;
            }
          }          
          
        });
      },
      initDatabase() {
       // DB_DATA = [];
          this.DB_DATA.push({
            name: "Бгор",
            date: "1980-05-20",
            sname: "Авдотьевич",
            family: "Брук" ,
            active: "✅",
          })
          this.DB_DATA.push({
            name: "Агор",
            date: "1986-05-20",
            sname: "Яихайлович",
            family: "Яманов" ,
            active: "😴",
          })
          this.DB_DATA.push({
            name: "Владимир",
            date: "1983-05-20",
            sname: "Михайлович",
            family: "Аманов" ,
            active: "😴",
          })          
        for (let i = 1; i < 1000; i++) {
          this.DB_DATA.push({
            name: "Николай" + i,
            date: (1900+i)+"-05-20",
            sname: "Александрович" + (1000-i),
            family: "Романов" + i,
            active: this.activeIs(i),
          });
        }
      },
    },
    created() {
      this.initDatabase();
      
    },
  };
</script>
    <style>
      span.ve-pagination-goto {
        display: none;
    }
    </style>