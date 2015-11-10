$(function () {
  validator.bind();
  var uid = location.pathname.split('/').pop();
  $.get('/user/' + uid, {}).done(function (json) {
    console.log(json);
    if (!json || json.status == 'fail') return false;
    render(json.result);
  }).fail(function (err) {
    console.log('err : ' + err);
  })
});

function render(user) {

  var cn = user.attributes.cn || '';
  var mail = user.attributes.mail || '';
  var mobile = user.attributes.mobile || '';
  var departmentNumber = user.attributes.departmentNumber || '';
  var displayName = user.attributes.displayName || '';
  var role = _.indexOf(user.role, 'cn=hr,ou=role_group,dc=xisue,dc=com') == -1 ? 'normal' : 'admin';
  $('#txtCn').val(cn[0]);
  $('#txtMail').val(mail[0]);
  $('#txtMobile').val(mobile[0]);
  $('#txtNick').val(displayName[0]);
  user.roleGroup.forEach(function (each) {
    $('#txtRole').append('<label style="margin-right: 20px"><input type="checkbox" value="' + each + '" name="role"/> ' + each + ' </label>');
  });
  var p = parseRole(user.role);

  setRole(p);
  $('#txtDepartment').val(departmentNumber[0]);
  $('#userDetail').data('dn', user.dn);
}

function edit(obj) {
  //$('#userDetail input').removeAttr('readonly');
  $(obj).siblings('input').data('old', $(obj).siblings('input').val()).removeAttr('readonly');
  $(obj).hide();
  $(obj).siblings('.btnSave').show();
  $(obj).siblings('.btnCancel').show();
}

function cancelEdit(obj) {
  $(obj).siblings('input').val($(obj).siblings('input').data('old')).attr('readonly', 'readonly');
  $(obj).hide();
  $(obj).siblings('.btnSave').hide();
  $(obj).siblings('.btnEdit').show();
}

function save(obj) {
  var user = {
    dn: $('#userDetail').data('dn'),
    attributes: {}
  };

  if ($(obj).siblings('input').val() == $(obj).siblings('input').data('old')) {
    $('#userDetail input').attr('readonly', 'readonly');
    $(obj).hide();
    $(obj).siblings('.btnCancel').hide();
    $(obj).siblings('.btnEdit').show();
    return false;
  }

  if (!validator.validate($(obj).siblings('input'))) {
    return false;
  }

  if ($(obj).siblings('input').val() == '') {
    return common.popBy($(obj).siblings('input'), "不能为空");
  }

  user.attributes[$(obj).siblings('input').attr('description')] = ($(obj).siblings('input').val() || '').split(',');

  $.ajax({
    type: "put",
    url: '/user',
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify(user),
    timeout: 20000
  }).then(function (json) {
    if (json.status == 'fail') {
      return common.popBy(obj, json.msg);
    }
    $('#userDetail input').attr('readonly', 'readonly');
    $(obj).hide();
    $(obj).siblings('.btnCancel').hide();
    $(obj).siblings('.btnEdit').show();
  }).fail(function (err) {
    console.log(err);
  });
}

function editManager(obj) {
  $('#txtRole').data('old', getRole()).show().siblings("#spRole").hide();
  $(obj).hide();
  $(obj).siblings('.btnSave').show();
  $(obj).siblings('.btnCancel').show();
}

function getRole() {
  var p = [];
  $('#txtRole').find(':checkbox').each(function(i, o) {
    if($(o).prop('checked')) p.push($(o).val())
  });

  return p;
}

function setRole(role) {
  $('#txtRole').find(':checkbox').prop('checked', false);
  $('#spRole').html('');
  role.forEach(function(item) {
    $(':checkbox[value="'+item +'"]').prop('checked', true);
    $('#spRole').append('<span style="margin-left: 20px">'+ item +'</span>');
  });
}

function cancelEditManager(obj) {
  var role = $('#txtRole').data('old');
  setRole(role);
  $('#txtRole').hide().siblings("#spRole").show();
  $(obj).hide();
  $(obj).siblings('.btnSave').hide();
  $(obj).siblings('.btnEdit').show();
}

function parseRole(role) {
  var p = [];
  role.forEach(function(item) {
    var reg = /cn\=[^,]+/;
    var ret = item.match(reg);
    if(ret) {
      if(ret[0]) {
        var x = ret[0].split('=');
        if(x.length = 2) {
          p.push(x[1]);
        }
      }
    }
  });

  return p;
}

//数组判等
function arrayEqual(arr1, arr2) {
  if(!_.isArray(arr1) || !_.isArray(arr2)) return false;
  if(arr1.length != arr2.length) return false;

  if(_.intersection(arr1, arr2).length != arr1.length) return false;

  return true;
}
function saveManager(obj) {

  var role = getRole();
  var oldRoles = $('#txtRole').data('old');
  //值未修改或者修改的对象是自己的时候 返回
  if ( arrayEqual(role, oldRoles) || $.cookie('dn') == $('#userDetail').data('dn')) {
    cancelEditManager($(obj).siblings('.btnCancel'));
    return false;
  }

  var method = 'post';
  //if (role != 'admin') method = 'delete';
  var t = {
    dn : $('#userDetail').data('dn'),
    roles : role
  };

  $.ajax({
    type: 'put',
    url: '/user/role',
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify(t),
    timeout: 20000
  }).then(function (json) {
    var role = getRole();
    setRole(role);
    $('#txtRole').hide().siblings("#spRole").show();
    $(obj).hide();
    $(obj).siblings('.btnCancel').hide();
    $(obj).siblings('.btnEdit').show();
  }).fail(function (err) {
    console.log(err);
  });
}