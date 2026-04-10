<template>
  <div id="bgimg">
    <button class="logout-button" @click="logout">Log Out</button>
    <div class="container">
      <div class="search-bar">
        <el-input v-model="searchQuery" placeholder="Search by username or email" clearable @input="handleSearch"
          class="custom-search-input">
          <template slot="prepend">
            <el-icon class="custom-icon"><i class="el-icon-search"></i></el-icon>
          </template>
        </el-input>
      </div>

      <div class="table-container">
        <el-table :data="filteredData" style="width: 100%" border :header-cell-style="{ backgroundColor: '#f0f0f0' }"
          :row-class-name="tableRowClassName">
          <el-table-column prop="id" label="ID" :formatter="row => row.id.toString()" >
          </el-table-column>
          <el-table-column prop="loginName" label="UserName" >
          </el-table-column>
          <el-table-column prop="email" label="Email" >
          </el-table-column>
          <el-table-column prop="password" label="Password" >
          </el-table-column>
          <el-table-column label="Operation" align="center" >
            <template slot-scope="scope">
              <el-button type="danger" @click="deleteRow(scope.row)">
                Delete
              </el-button>
            </template>
          </el-table-column>
        </el-table>

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tableData: [],
      searchQuery: '',
    };
  },
  computed: {
    filteredData() {
      if (!this.searchQuery) {
        return this.tableData;
      }
      const query = this.searchQuery.toLowerCase();
      return this.tableData.filter(
        (item) =>
          item.loginName.toLowerCase().includes(query) ||
          item.email.toLowerCase().includes(query)
      );
    },
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    logout() {
      localStorage.removeItem("authToken");
      localStorage.clear();

      fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      })
        .then(response => {
          if (response.ok) {
            console.log("Successfully logged out");
          } else {
            console.error("Failed to log out from the server");
          }
        })
        .catch(error => {
          console.error("Logout error:", error);
        });

      this.$emit("user-logged-out");
      this.$router.push("/");
    },
    fetchData() {
      axios
        .get('https://api.hope52411.tech/sys-user/Admin')
        .then((response) => {
          this.tableData = response.data.map((item) => {
            item.id = BigInt(item.id);
            return item;
          });
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    },
    handleSearch() {
    },
    tableRowClassName({ rowIndex }) {
      return rowIndex % 2 === 0 ? 'row-even' : 'row-odd';
    },
    deleteRow(row) {
      this.$confirm('This action will permanently delete the user. Continue?', 'Warning', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning',
      })
        .then(() => {
          axios
            .delete(`https://api.hope52411.tech/sys-user/${row.id}`)
            .then(() => {
              const index = this.tableData.indexOf(row);
              if (index !== -1) {
                this.tableData.splice(index, 1);
                this.$message.success('Successfully deleted');
              }
            })
            .catch((error) => {
              console.error('Error deleting row:', error);
              this.$message.error('Deletion failure');
            });
        })
        .catch(() => {
          this.$message.info('Deletion canceled');
        });
    },
  },
};
</script>

<style scoped>
#bgimg {
  background: url('~@/assets/bgimg.png') no-repeat center center;
  width: 100%;
  min-height: 100vh;
  position: fixed;
  background-size: cover;
}

h1 {
  color: #ffffff;
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

.search-bar {
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  width: 60%;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}


.custom-search-input {
  width: 60%;
  font-size: 16px;
  padding: 10px;
  border-radius: 25px;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 -2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease-in-out;
}

.custom-search-input:hover {
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15), 0 -3px 6px rgba(0, 0, 0, 0.08);
  transform: scale(1.02);
}

.custom-search-input input {
  border: none;
  outline: none;
}

.custom-search-input .el-icon {
  color: #999999;
  margin-right: 8px;
}

.custom-icon {
  font-size: 40px;
  color: #000000;
}

.custom-icon:hover {
  color: #000000;
  transform: scale(1.1);
}


/* 表格样式 */
.table-container {
  position: fixed;
  top: 160px;
  /* 紧跟搜索框下方，按搜索框的高度 + 间距设置 */
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-height: calc(100vh - 180px);
  /* 防止超出视口 */
  overflow-y: auto;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 999;
}



.row-even {
  background-color: rgba(249, 249, 249, 0.9);
}

.row-odd {
  background-color: rgba(236, 236, 236, 0.9);
}

.el-table th {
  color: #333333;
  font-weight: bold;
}

.el-table td {
  font-size: 14px;
  padding: 12px;
}

/* 按钮样式 */
.el-button {
  font-size: 14px;
  padding: 5px 15px;
}

.logout-button {
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;

  position: absolute;
  top: 33px;
  right: 10px;
}
</style>