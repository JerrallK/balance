# -*- coding: utf-8 -*-
import time, datetime, MySQLdb, requests

conn = MySQLdb.connect(host = "localhost", user = "root", passwd = "111", db = "balance", charset = "utf8", unix_socket = "/opt/lampp/var/mysql/mysql.sock")
cursor = conn.cursor()

today = datetime.date.today()
yestoday = today - datetime.timedelta(2)
sql = "select sim from baseinfo where lastcheck < '" + str(yestoday) + "'"
cursor.execute(sql)
for sims in cursor.fetchall():
    for sim in sims:
        
        #构建查询参数并查询
        
        data = """
<ROOT>
<TEL_NO>%(tel)s</TEL_NO>
<PS>123123</PS>
<EB>1</EB>
<CLIENT_VER>1.8.5</CLIENT_VER>
<SYS_TYPE>1</SYS_TYPE>
</ROOT>
        """
        data = data % {"tel" : sim}
        headers = {'Content-Type': 'application/xml'}
        s = requests.session()
        r1 = s.post('https://clientaccess.10086.cn:9043/tcpbus/mobile?code=291', data=data, headers=headers, verify=False)
        r2 = s.post('https://clientaccess.10086.cn:9043/tcpbus/mobile?code=701', data=data, headers=headers, verify=False)
        balance = r2.text.replace("<ROOT><BALANCE>","").replace("</BALANCE></ROOT>","")
        if balance == "":
            balance = 99999
            status = " Wrong Passwd"
        else:
            status = " OK"
        balance = float(balance)
        
        #插入detail表
        sql = "insert into detail(sim, date, balance) values(%s, %s, %s)"
        param = (sim, datetime.date.today(), balance)
        cursor.execute(sql, param)
        conn.commit()

        #修改baseinfo表
        sql = "update baseinfo set lastcheck = %s, current = %s where sim = %s"
        param = (datetime.date.today(), balance, sim)
        cursor.execute(sql, param)
        conn.commit()

        #输出运行结果
        print sim + " " + str(balance) + status
        time.sleep(30)

cursor.close()
