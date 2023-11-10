import React, { Component } from "react";
import Card from "./card";
import $ from "jquery";

class Profile extends Component {
  state = {
    error_message: "",
  };

  componentDidMount() {
    this.render_gender_radio();
    this.hide_send_status();
  }

  hide_send_status = () => {
    $("#update_success").hide();
  };

  render_gender_radio = () => {
    if (this.props.gender === "Male") $("#male").attr("checked", "checked");
    else if (this.props.gender === "Female")
      $("#female").attr("checked", "checked");
    else if (this.props.gender === "Other")
      $("#other").attr("checked", "checked");
  };

  handleUpdate = () => {
    let username = $("#inputUsername").val();
    let email = $("#inputEmail").val();
    let intro = $("#inputIntroduction").val();
    let gender = "";
    if ($("#male:checked").val()) gender = "Male";
    else if ($("#female:checked").val()) gender = "Female";
    else if ($("#other:checked").val()) gender = "Other";
    this.setState({ error_message: "" });
    let $update_success = $("#update_success");
    $.ajax({
      url: "http://localhost:8000/api/update/",
      // url: 'http://8.130.54.44:8000/api/update/',  // 部署在云服务器上
      type: "GET",
      data: {
        username: username,
        email: email,
        intro: intro,
        gender: gender,
      },
      dataType: "json",
      success: (resp) => {
        console.log(resp);
        if (resp.result === "success") {
          $update_success.fadeIn();
          setTimeout(function () {
            $update_success.fadeOut();
            window.location.href = "/"; // 重定向到根路径
          }, 1000);
        } else {
          this.setState({ error_message: resp.result });
        }
      },
    });
  };

  render() {
    return (
      <Card header={<h3>Profile</h3>}>
        <div className="card card_half_shadow">
          <div className="card-header text-center">
            <h1>个人信息</h1>
          </div>
          <form style={{ margin: "1rem" }}>
            <div className="mb-3 row justify-content-center">
              <label
                htmlFor="inputUsername"
                className="col-md-3 col-form-label"
                style={{ textAlign: "right" }}
              >
                Username:
              </label>
              <div className="col-md-7">
                <input
                  type="text"
                  className="form-control"
                  id="inputUsername"
                  defaultValue={this.props.username}
                />
              </div>
            </div>
            <div className="mb-3 row justify-content-center">
              <label
                htmlFor="inputEmail"
                className="col-md-3 col-form-label"
                style={{ textAlign: "right" }}
              >
                Email:
              </label>
              <div className="col-md-7">
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  defaultValue={this.props.email}
                />
              </div>
            </div>
            <div className="mb-3 row justify-content-center">
              <label
                htmlFor="inputIntroduction"
                className="col-md-3 col-form-label"
                style={{ textAlign: "right" }}
              >
                Introduction:
              </label>
              <div className="col-md-7">
                <input
                  type="text"
                  className="form-control"
                  id="inputIntroduction"
                  defaultValue={this.props.intro}
                />
              </div>
            </div>
            <div className="mb-3 row justify-content-center">
              <label
                htmlFor="inputDateJoined"
                className="col-md-3 col-form-label"
                style={{ textAlign: "right" }}
              >
                Date Joined:
              </label>
              <div className="col-md-7">
                <input
                  type="text"
                  className="form-control"
                  id="inputDateJoined"
                  readOnly
                  value={this.props.date_joined}
                />
              </div>
            </div>
            <div className="mb-3 text-center">
              <label className="col-md-2 col-form-label">Gender:</label>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="radioOptions"
                  id="male"
                  value="male"
                />
                <label className="form-check-label" htmlFor="male">
                  Male
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="radioOptions"
                  id="female"
                  value="female"
                />
                <label className="form-check-label" htmlFor="female">
                  Female
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="radioOptions"
                  id="other"
                  value="other"
                />
                <label className="form-check-label" htmlFor="other">
                  Other
                </label>
              </div>
            </div>
            <div
              style={{
                fontSize: "1rem",
                color: "red",
                textAlign: "center",
                marginBottom: "15px",
              }}
            >
              {this.state.error_message}
            </div>
            <div className="d-grid gap-2 col-4 mx-auto">
              <button
                onClick={this.handleUpdate}
                className="btn btn-outline-success"
                type="button"
              >
                Update Information
              </button>
            </div>
            <div
              id="update_success"
              style={{
                fontWeight: 500,
                fontSize: "1.5rem",
                color: "rgb(68, 157, 68)",
                textAlign: "center",
              }}
            >
              Update successfully!
            </div>
          </form>
        </div>
      </Card>
    );
  }
}

export default Profile;
